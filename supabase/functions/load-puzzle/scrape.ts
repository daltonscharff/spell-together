import { Page } from "./models/page.ts";
import { Puzzle } from "./models/puzzle.ts";
import { Word } from "./models/word.ts";
import { html } from "./fixtures/webpage.ts";

export async function scrape() {
  const page = new Page();

  if (Deno.env.get("ENVIRONMENT") !== "production") {
    await page.load(html);
  } else {
    await page.load();
  }

  const words = await Promise.all(
    page.words.map(async (w) => {
      const word = new Word(w);
      await word.lookup();
      return word;
    })
  );

  const puzzle = new Puzzle();
  puzzle.date = page.date.toISOString();
  puzzle.center_letter = page.centerLetter;
  puzzle.outer_letters = page.outerLetters;
  puzzle.max_score = Word.addPoints(words);

  await puzzle.save();
  await Word.saveAll(words, puzzle.id);
  console.log({ puzzle, words });
}
