import { db } from "@/prisma/db";

export async function GET(_: Request) {
  const puzzles = await db.orm.public.Puzzle.all();
  return new Response(JSON.stringify({ puzzles, count: puzzles.length }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
