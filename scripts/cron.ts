import type { Models } from "../prisma/contract.d";
import { db } from "../prisma/db";
import axios from "axios";
import axiosRetry from "axios-retry";

const PUZZLE_RETENTION_DAYS =
  process.env.CRON_PUZZLE_RETENTION_DAYS &&
  parseInt(process.env.CRON_PUZZLE_RETENTION_DAYS, 10);
const ROOM_RETENTION_DAYS =
  process.env.CRON_ROOM_RETENTION_DAYS &&
  parseInt(process.env.CRON_ROOM_RETENTION_DAYS, 10);

const SPELLING_BEE_URL = "https://www.nytimes.com/puzzles/spelling-bee";

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
  puzzle: Partial<Models.public_Puzzle>,
): Promise<Models.public_Puzzle> {
  // Implementation for writing puzzle
}

async function getDictionaryData(
  word: string,
): Promise<Partial<Models.public_Word>> {
  // Make request to dictionary API to get definition and part of speech
  // e.g., https://freedictionaryapi.com/api/v1/entries/en/hello

  return { value: "", definition: "", partOfSpeech: "" };
}

async function writeWord(word: string): Promise<Models.public_Word> {
  const dictionaryData = await getDictionaryData(word);
  // const wordRecord = await db.orm.public.Word.create({
  //   value: word,
  //   definition: dictionaryData.definition,
  //   partOfSpeech: dictionaryData.partOfSpeech,
  // });
  // return wordRecord;
}

async function writePuzzleWord(
  puzzleId: number,
  wordId: number,
): Promise<Models.public_PuzzleWord> {
  await db.orm.public.PuzzleWord.create({
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

  const wordRecords: Models.public_Word[] = [];
  for (const answer of puzzle.answers) {
    const wordRecord = await writeWord(answer);
    wordRecords.push(wordRecord);
  }

  const puzzleRecord = await writePuzzle({
    date: Temporal.Instant.from(puzzle.displayDate),
    centerLetter: puzzle.centerLetter,
    outerLetters: puzzle.outerLetters.join(""),
  });

  // write puzzle_words
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
