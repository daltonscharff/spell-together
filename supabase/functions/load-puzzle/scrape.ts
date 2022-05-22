import { Puzzle } from "./models/puzzle.ts";
import { Word } from "./models/word.ts";
import { gameData as mockGameData } from "./fixtures/gameData.ts";

export async function scrape() {
  let gameData;

  if (Deno.env.get("ENVIRONMENT") === "production") {
    const request = await fetch("https://www.nytimes.com/puzzles/spelling-bee");
    const html = await request.text();
    const pattern = new RegExp("window.gameData = ({.*}})</script></div>", "g");
    const matches = pattern.exec(html);
    if (!matches) throw new Error("Could not find gameData");
    gameData = JSON.parse(matches[1]);
  } else {
    gameData = mockGameData;
  }

  const words = await Promise.all(
    gameData.today.answers.map(async (a: string) => {
      const word = new Word(a);
      await word.lookup();
      return word;
    })
  );

  const puzzle = new Puzzle();
  puzzle.date = gameData.today.printDate;
  puzzle.center_letter = gameData.today.centerLetter;
  puzzle.outer_letters = gameData.today.outerLetters;
  puzzle.max_score = Word.addPoints(words);
  puzzle.editor = gameData.today.editor;

  await puzzle.save();
  await Word.saveAll(words, puzzle.id);
  return { puzzle, words };
}
