import { ScrapedData } from "./scrape";
import { connect, Word, Puzzle } from "@daltonscharff/spelling-bee-core";

export default async function update(data: ScrapedData) {
  const connection = await connect({
    url: process.env.DATABASE_URL,
    extra: {
      max: 1, // limit connection pool to 1
    },
  });

  await connection.createQueryBuilder().delete().from(Word).execute();
  await connection.createQueryBuilder().delete().from(Puzzle).execute();

  const answers = data.words.map((word) => {
    const entity = new Word();
    entity.word = word;
    entity.pointValue = calculatePointValue(word);
    entity.isPanagram = isPanagram(word);
    return entity;
  });

  const puzzle = new Puzzle();
  puzzle.date = data.date;
  puzzle.letters = data.letters;
  puzzle.centerLetter = data.centerLetter;
  puzzle.maxScore = answers.reduce((total, word) => {
    return (total += word.pointValue);
  }, 0);
  puzzle.answers = answers;

  await Promise.all(answers.map(async (word) => connection.manager.save(word)));
  await connection.manager.save(puzzle);
}

function isPanagram(word: string): boolean {
  const letterSet = new Set<string>();
  for (let letter of word.split("")) {
    letterSet.add(letter);
  }
  return letterSet.size === 7;
}

function calculatePointValue(word: string): number {
  let points = 0;
  if (word.length === 4) {
    points = 1;
  } else if (word.length > 4) {
    points = word.length;
  }

  if (isPanagram(word)) points += 7;

  return points;
}

function lookup(word: string): {
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
} {
  return {};
}
