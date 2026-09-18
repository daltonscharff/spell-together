import type { FieldOutputTypes } from "../prisma/contract.d";
import { db } from "../prisma/db";
import axios from "axios";
import axiosRetry from "axios-retry";

type Puzzle = FieldOutputTypes["public"]["Puzzle"];
type Word = FieldOutputTypes["public"]["Word"];
type PuzzleWord = FieldOutputTypes["public"]["PuzzleWord"];

const PUZZLE_RETENTION_DAYS =
  process.env.CRON_PUZZLE_RETENTION_DAYS &&
  parseInt(process.env.CRON_PUZZLE_RETENTION_DAYS, 10);
const ROOM_RETENTION_DAYS =
  process.env.CRON_ROOM_RETENTION_DAYS &&
  parseInt(process.env.CRON_ROOM_RETENTION_DAYS, 10);

const SPELLING_BEE_URL = "https://www.nytimes.com/puzzles/spelling-bee";

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
    console.log(`Retry attempt: ${retryCount}`);
    return retryCount * 1000; // Wait 1 second before retrying
  },
});

async function deletePuzzles(olderThan: Temporal.Instant) {
  const deletedPuzzles = await db.orm.public.Puzzle.where((p) =>
    p.date.lt(olderThan),
  ).deleteAll();
  return deletedPuzzles.length;
}

async function deleteRooms(olderThan: Temporal.Instant) {
  const deletedRooms = await db.orm.public.Room.where((r) =>
    r.lastPlayed.lt(olderThan),
  ).deleteAll();
  return deletedRooms.length;
}

async function scrapePuzzle() {
  const spellingBeeResponse = await axios.get<string>(SPELLING_BEE_URL);
  const html = spellingBeeResponse.data;
  const gameDataRaw = html.match(/window\.gameData\s*=\s*(.*)<\/script>/)?.[0];

  if (!gameDataRaw) {
    throw new Error("Could not find gameData in the HTML");
  }

  const gameData = JSON.parse(gameDataRaw) as GameDataResponse;
  return gameData.today;
}

async function writePuzzle(
  puzzle: Omit<Puzzle, "id" | "createdAt" | "updatedAt">,
): Promise<Puzzle> {
  return db.orm.public.Puzzle.create(puzzle);
}

async function getDictionaryData(
  word: string,
): Promise<Pick<Word, "definition" | "partOfSpeech">> {
  const response = await axios.get<DictionaryApiResponse>(
    `https://freedictionaryapi.com/api/v1/entries/en/${word}`,
  );

  if (!response.data.entries || response.data.entries.length === 0) {
    throw new Error(`No dictionary entries found for word: ${word}`);
  }

  return {
    definition: response.data.entries[0].senses[0].definition,
    partOfSpeech: response.data.entries[0].partOfSpeech,
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

async function writeWord(word: string): Promise<Word> {
  const { definition, partOfSpeech } = await getDictionaryData(word);
  const isPangram = getIsPangram(word);
  const pointValue = getWordScore(word, isPangram);
  const wordRecord = await db.orm.public.Word.create({
    value: word,
    definition,
    partOfSpeech,
    isPangram,
    pointValue,
  });
  return wordRecord;
}

async function writePuzzleWord(
  puzzleId: number,
  wordId: number,
): Promise<PuzzleWord> {
  return db.orm.public.PuzzleWord.create({
    puzzleId,
    wordId,
  });
}

const today = Temporal.Now.instant();

if (!PUZZLE_RETENTION_DAYS) {
  throw new Error("CRON_PUZZLE_RETENTION_DAYS is not set");
}
if (!ROOM_RETENTION_DAYS) {
  throw new Error("CRON_ROOM_RETENTION_DAYS is not set");
}

if (db.orm.public.Puzzle.first({ date: today }) !== null) {
  console.log("Puzzle already exists for today, skipping scrape");
} else {
  const puzzle = await scrapePuzzle();

  const wordRecords: Word[] = [];
  for (const answer of puzzle.answers) {
    const wordRecord = await writeWord(answer);
    wordRecords.push(wordRecord);
  }

  const maxScore = wordRecords.reduce(
    (total, word) => total + word.pointValue,
    0,
  );

  const puzzleRecord = await writePuzzle({
    date: Temporal.Instant.from(puzzle.displayDate),
    centerLetter: puzzle.centerLetter,
    outerLetters: puzzle.outerLetters.join(""),
    maxScore,
  });

  await Promise.all(
    wordRecords.map((wordRecord) =>
      writePuzzleWord(puzzleRecord.id, wordRecord.id),
    ),
  );
}

await deletePuzzles(today.subtract({ days: PUZZLE_RETENTION_DAYS })).catch(
  (err) => {
    console.error("Error deleting puzzles:", err);
  },
);
await deleteRooms(today.subtract({ days: ROOM_RETENTION_DAYS })).catch(
  (err) => {
    console.error("Error deleting rooms:", err);
  },
);
