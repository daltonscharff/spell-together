import { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";

export type Puzzle = FieldOutputTypes["public"]["Puzzle"];

export type PuzzleResponse = { puzzles: Puzzle[] };

export async function GET(_: Request) {
  const puzzles = await db.orm.public.Puzzle.all();

  const response: PuzzleResponse = { puzzles };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
