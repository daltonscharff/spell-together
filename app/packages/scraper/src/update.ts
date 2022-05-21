import fetch from "node-fetch";
import { ScrapedData } from "./scrape";
import connect, { Puzzle, Word } from "@daltonscharff/spelling-bee-core";

const lookupUrl = "https://wordsapiv1.p.rapidapi.com/words";

function isPangram(word: string): boolean {
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
  if (isPangram(word)) points += 7;
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

export default async function update(data: ScrapedData) {
  const knex = await connect();
  await Promise.all([Word.query().delete(), Puzzle.query().delete()]);

  const words = await Promise.all(
    data.words.map(async (word) => {
      const { definition, partOfSpeech, synonym } = await lookup(word);
      return await Word.query().insertAndFetch({
        word,
        pointValue: calculatePointValue(word),
        isPangram: isPangram(word),
        definition,
        partOfSpeech,
        synonym,
      });
    })
  );

  const puzzle = await Puzzle.query().insertAndFetch({
    outerLetters: data.letters.filter((letter) => letter !== data.centerLetter),
    centerLetter: data.centerLetter,
    maxScore: words.reduce((total, word) => (total += word.pointValue), 0),
  });

  await knex.destroy();
  return { puzzle, words };
}
