import { db } from '../prisma/db.ts';
import logger from './logger.ts';

async function deletePuzzles(olderThan: Temporal.Instant) {
	const deletedPuzzles = await db.orm.public.Puzzle.where((p) => p.date.lt(olderThan)).deleteAll();
	return deletedPuzzles;
}

const PUZZLE_RETENTION_DAYS = process.argv[2] && parseInt(process.argv[2], 10);
if (!PUZZLE_RETENTION_DAYS) {
	throw new Error('PUZZLE_RETENTION_DAYS must be passed in an argument');
}

const today = Temporal.Now.instant();

const deletedPuzzles = await deletePuzzles(
	today.subtract({ hours: PUZZLE_RETENTION_DAYS * 24 })
).catch((err) => {
	logger.error('Error deleting puzzles:', err);
});
if (deletedPuzzles) {
	logger.info(`Deleted ${deletedPuzzles.length} puzzles older than ${PUZZLE_RETENTION_DAYS} days`);
	logger.debug(`Deleted puzzles: ${deletePuzzles}`);
}

// Clean up any words which no longer belong to a puzzle
const deletedWordsQuery = db.sql.public.word
	.delete()
	.where((f, fns) => {
		return fns.notIn(f.id, db.sql.public.puzzleWord.select('wordId'));
	})
	.returning('id', 'value')
	.build();
const deletedWords = await db.runtime().query(deletedWordsQuery);
if (deletedWords) {
	logger.info(`Deleted ${deletedWords.length} unused words`);
	logger.debug(`Deleted words: ${deletedWords}`);
}

db.close();
