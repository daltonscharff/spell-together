import type { Models } from "../prisma/contract.d";
import { db } from "../prisma/db";

async function deletePuzzles(olderThan: Date) {}

async function deleteRooms(olderThan: Date) {}

async function scrapePuzzle(): Promise<Partial<Models.public_Puzzle>> {
  return { centerLetter: "", outerLetters: "", maxScore: 0 };
}

async function writePuzzle(puzzle: Partial<Models.public_Puzzle>) {}

async function getDictionaryData(
  word: string,
): Promise<Partial<Models.public_Word>> {
  // Make request to dictionary API to get definition and part of speech
  // e.g., https://freedictionaryapi.com/api/v1/entries/en/hello

  return { value: "", definition: "", partOfSpeech: "" };
}

async function writeWord(word: Partial<Models.public_Word>) {}

const today = new Date();
const PUZZLE_RETENTION_DAYS =
  process.env.CRON_PUZZLE_RETENTION_DAYS &&
  parseInt(process.env.CRON_PUZZLE_RETENTION_DAYS, 10);
const ROOM_RETENTION_DAYS =
  process.env.CRON_ROOM_RETENTION_DAYS &&
  parseInt(process.env.CRON_ROOM_RETENTION_DAYS, 10);

if (!PUZZLE_RETENTION_DAYS) {
  throw new Error("CRON_PUZZLE_RETENTION_DAYS is not set");
}
if (!ROOM_RETENTION_DAYS) {
  throw new Error("CRON_ROOM_RETENTION_DAYS is not set");
}

if (db.orm.public.Puzzle.first({ date: today }) !== null) {
  console.log("Puzzle already exists for today, skipping scrape");
}

await deletePuzzles(
  new Date(Date.now() - 1000 * 60 * 60 * 24 * PUZZLE_RETENTION_DAYS),
).catch((err) => {
  console.error("Error deleting puzzles:", err);
});
await deleteRooms(
  new Date(Date.now() - 1000 * 60 * 60 * 24 * ROOM_RETENTION_DAYS),
).catch((err) => {
  console.error("Error deleting rooms:", err);
});
