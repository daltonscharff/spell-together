import { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";

type Word = FieldOutputTypes["public"]["Word"];
type Puzzle = FieldOutputTypes["public"]["Puzzle"];

export type PuzzleResponse = Puzzle & {
  words: Word[];
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ puzzleId: string }> },
) {
  const { puzzleId } = await params;
  const puzzleIdNumber = parseInt(puzzleId, 10);
  if (isNaN(puzzleIdNumber)) {
    return new Response(JSON.stringify({ error: "Invalid puzzle ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const puzzle = await db.orm.public.Puzzle.where({
    id: puzzleIdNumber,
  })
    .include("words", (words) => words.include("word").select("wordId"))
    .first();

  if (!puzzle) {
    return new Response(JSON.stringify({ error: "Puzzle not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const puzzleResponse: PuzzleResponse = {
    ...puzzle,
    words: puzzle.words.map((pw) => pw.word).filter((word) => word !== null),
  };
  return new Response(JSON.stringify(puzzleResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
