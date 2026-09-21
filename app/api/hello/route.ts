import { db } from "../../../prisma/db";

export async function GET(req: Request) {
  const puzzles = await db.orm.public.Puzzle.all();
  return new Response(JSON.stringify({ puzzles }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
