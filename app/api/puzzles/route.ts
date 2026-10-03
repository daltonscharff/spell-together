import { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";

export type Puzzle = Omit<
  FieldOutputTypes["public"]["Puzzle"],
  "outerLetters"
> & {
  outerLetters: string[];
};

export type PuzzlesResponse = { puzzles: Puzzle[] };

export async function GET(_: Request) {
  const puzzles = await db.orm.public.Puzzle.orderBy((p) => p.date.desc())
    .limit(3)
    .all();

  const response: PuzzlesResponse = {
    puzzles: puzzles.map((puzzle) => ({
      ...puzzle,
      outerLetters: puzzle.outerLetters.split(""),
    })),
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
