import { Page } from "./models/page.ts";
import { Puzzle } from "./models/puzzle.ts";
import { Word } from "./models/word.ts";

export async function scrape() {
  const page = new Page();

  await page.load();

  const words = await Promise.all(
    page.words.map((w) => {
      const word = new Word(w);
      // await word.lookup();
      return word;
    })
  );

  const puzzle = new Puzzle();
  puzzle.date = page.date;
  puzzle.center_letter = page.centerLetter;
  puzzle.outer_letters = page.outerLetters;
  puzzle.max_score = Word.addPoints(words);

  await puzzle.save();
  await Word.saveAll(words, puzzle.id);
}
