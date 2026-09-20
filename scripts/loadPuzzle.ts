import type { FieldOutputTypes } from '../prisma/contract.d.ts';
import { db } from '../prisma/db.ts';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import logger from './logger.ts';

type Puzzle = FieldOutputTypes['public']['Puzzle'];
type Word = FieldOutputTypes['public']['Word'];
type PuzzleWord = FieldOutputTypes['public']['PuzzleWord'];

const SPELLING_BEE_URL = 'https://www.nytimes.com/puzzles/spelling-bee';

const PANGRAM_LENGTH = 7;

type NytPuzzle = {
	answers: string[];
	centerLetter: string;
	displayDate: string;
	displayWeekday: string;
	editor: string;
	freeExpiration: number;
	id: number;
	outerLetters: string[];
	pangrams: string[];
	printDate: string;
	validLetters: string[];
};

type GameDataResponse = {
	today: NytPuzzle;
	yesterday: NytPuzzle;
	pastPuzzles: {
		lastWeek: NytPuzzle[];
		thisWeek: NytPuzzle[];
		today: NytPuzzle;
		yesterday: NytPuzzle;
	};
};

type DictionaryApiResponse = {
	word: string;
	entries: {
		language: {
			code: string;
			name: string;
		};
		partOfSpeech: string;
		pronunciations: {
			type: string;
			text: string;
			tags: string[];
		}[];
		forms: {
			word: string;
			tags: string[];
		}[];
		senses: {
			definition: string;
			examples: string[];
			tags: string[];
			quotes: string[];
			synonyms: string[];
			antonyms: string[];
			subsenses: string[];
		}[];
		synonyms: string[];
		antonyms: string[];
	}[];
	source: {
		url: string;
		license: {
			name: string;
			url: string;
		};
	};
};

axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => {
		logger.info(`Retry attempt: ${retryCount}`);
		return retryCount * 1000; // Wait 1 second before retrying
	}
});

async function scrapePuzzle() {
	const spellingBeeResponse = await axios.get<string>(SPELLING_BEE_URL);
	const html = spellingBeeResponse.data;
	const gameDataRaw = html.match(/window\.gameData\s*=\s*(.*)<\/script><\/div>/)?.[1];

	if (!gameDataRaw) {
		throw new Error('Could not find gameData in the HTML');
	}

	const gameData = JSON.parse(gameDataRaw) as GameDataResponse;
	return gameData.today;
}

async function writePuzzle(
	puzzle: Omit<Puzzle, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Puzzle> {
	return db.orm.public.Puzzle.create(puzzle);
}

async function getDictionaryData(word: string): Promise<Pick<Word, 'definition' | 'partOfSpeech'>> {
	const response = await axios.get<DictionaryApiResponse>(
		`https://freedictionaryapi.com/api/v1/entries/en/${word}`
	);

	if (!response.data.entries || response.data.entries.length === 0) {
		throw new Error(`No dictionary entries found for word: ${word}`);
	}

	return {
		definition: response.data.entries[0].senses[0].definition,
		partOfSpeech: response.data.entries[0].partOfSpeech
	};
}

function getWordScore(word: string, isPangram: boolean): number {
	let points = 0;
	if (word.length === 4) {
		points = 1;
	} else if (word.length > 4) {
		points = word.length;
	}
	if (isPangram) points += 7;
	return points;
}

function getIsPangram(word: string): boolean {
	const uniqueLetters = new Set(word.toLowerCase());
	return uniqueLetters.size === PANGRAM_LENGTH;
}

async function writeWord(word: string): Promise<{ wordRecord: Word; isNewWord: boolean }> {
	let wordRecord = await db.orm.public.Word.first({
		value: word
	});
	if (wordRecord) {
		return { wordRecord, isNewWord: false };
	}

	const { definition, partOfSpeech } = await getDictionaryData(word).catch((err) => {
		logger.error(`Error fetching dictionary data for word "${word}":`, err);
		return { definition: null, partOfSpeech: null };
	});
	const isPangram = getIsPangram(word);
	const pointValue = getWordScore(word, isPangram);
	wordRecord = await db.orm.public.Word.create({
		value: word,
		definition,
		partOfSpeech,
		isPangram,
		pointValue
	});

	return { wordRecord, isNewWord: true };
}

async function writePuzzleWord(puzzleId: number, wordId: number): Promise<PuzzleWord> {
	return db.orm.public.PuzzleWord.create({
		puzzleId,
		wordId
	});
}

const today = Temporal.Now.instant();

const todaysPuzzle = await db.orm.public.Puzzle.first({
	dateDisplay: today.toLocaleString('en-US', {
		dateStyle: 'long'
	})
});
if (todaysPuzzle !== null) {
	logger.info(
		`Today's puzzle is already loaded: ${todaysPuzzle.dateDisplay}, ${todaysPuzzle.centerLetter}_${todaysPuzzle.outerLetters}`
	);
	await db.close();
	process.exit(0);
} else {
	const puzzle = await scrapePuzzle().catch((err) => {
		logger.error('Error scraping puzzle:', err);
		throw err;
	});
	logger.info(
		`Scraped puzzle for ${puzzle.displayDate}: ${puzzle.centerLetter}_${puzzle.outerLetters.join('')}, ${puzzle.answers.length} answers, ${puzzle.pangrams.length} pangrams`
	);

	const wordRecords: Word[] = [];
	let newWordCount = 0;
	for (const word of puzzle.answers) {
		const { wordRecord, isNewWord } = await writeWord(word).catch((err) => {
			logger.error(`Error writing word "${word}" to database:`, err);
			return { wordRecord: null, isNewWord: null };
		});
		if (wordRecord) {
			wordRecords.push(wordRecord);
		}
		if (isNewWord) newWordCount++;
	}
	logger.info(`Wrote ${newWordCount} new words`);

	const maxScore = wordRecords.reduce((total, word) => total + word.pointValue, 0);
	logger.info(`MaxScore: ${maxScore}`);

	const puzzleRecord = await writePuzzle({
		date: new Date(puzzle.displayDate).toTemporalInstant(),
		dateDisplay: puzzle.displayDate,
		centerLetter: puzzle.centerLetter,
		outerLetters: puzzle.outerLetters.join(''),
		maxScore
	}).catch((err) => {
		logger.error('Error writing puzzle to database:', err);
		throw err;
	});

	await Promise.all(
		wordRecords.map((wordRecord) => writePuzzleWord(puzzleRecord.id, wordRecord.id))
	).catch((err) => {
		logger.error('Error writing puzzle words to database:', err);
		throw err;
	});
}

await db.close();
