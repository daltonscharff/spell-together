import fetch from "node-fetch";
import { ScrapedData } from "./scrape";
import { connect, Word, Puzzle } from "@daltonscharff/spelling-bee-core";

const lookupUrl = "https://wordsapiv1.p.rapidapi.com/words";

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

async function lookup(word: string): Promise<{
  definition?: string;
  partOfSpeech?: string;
  synonym?: string;
}> {
  const response = await fetch(`${lookupUrl}/${word}`, {
    headers: {
      "X-Mashape-Key": process.env.RAPID_API_KEY,
    },
  });

  const { results } = await response.json();
  if (results === undefined) return {};

  return {
    definition: results[0].definition,
    partOfSpeech: results[0].partOfSpeech,
    synonym: results[0].synonyms?.pop(),
  };
}

export default async function update(data: ScrapedData): Promise<Puzzle> {
  const connection = await connect({
    url: process.env.DATABASE_URL,
    extra: {
      max: 1, // limit connection pool to 1
    },
  });

  await connection.createQueryBuilder().delete().from(Word).execute();
  await connection.createQueryBuilder().delete().from(Puzzle).execute();

  const answers = await Promise.all(
    data.words.map(async (word) => {
      const entity = new Word();
      entity.word = word;
      entity.pointValue = calculatePointValue(word);
      entity.isPanagram = isPanagram(word);
      const { definition, partOfSpeech, synonym } = await lookup(word);
      entity.definition = definition || null;
      entity.partOfSpeech = partOfSpeech || null;
      entity.synonym = synonym || null;
      await connection.manager.save(entity);
      return entity;
    })
  );

  const puzzle = new Puzzle();
  puzzle.date = data.date;
  puzzle.letters = data.letters;
  puzzle.centerLetter = data.centerLetter;
  puzzle.maxScore = answers.reduce((total, word) => {
    return (total += word.pointValue);
  }, 0);
  puzzle.answers = answers;
  await connection.manager.save(puzzle);

  return puzzle;
}
