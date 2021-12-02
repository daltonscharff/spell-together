import fetch from "node-fetch";
import { ScrapedData } from "./scrape";
import { prisma } from "@daltonscharff/spelling-bee-core";

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

export default async function update(data: ScrapedData) {
  await prisma.puzzleWord.deleteMany();
  await Promise.all([prisma.word.deleteMany(), prisma.puzzle.deleteMany()]);

  const words = await Promise.all(
    data.words.map(async (word) => {
      const { definition, partOfSpeech, synonym } = await lookup(word);
      const w = {
        word: word,
        pointValue: calculatePointValue(word),
        isPanagram: isPanagram(word),
        definition,
        partOfSpeech,
        synonym,
      };
      return w;
    })
  );

  const wordIds = await Promise.all(
    words.map(async (word) => {
      return {
        wordId: (
          await prisma.word.create({
            select: {
              id: true,
            },
            data: word,
          })
        ).id,
      };
    })
  );

  const puzzle = await prisma.puzzle.create({
    data: {
      letters: data.letters,
      centerLetter: data.centerLetter,
      maxScore: words.reduce((total, word) => (total += word.pointValue), 0),
      answers: {
        createMany: {
          data: wordIds,
        },
      },
    },
  });

  return puzzle;
}
