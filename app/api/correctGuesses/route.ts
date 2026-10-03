import { FieldOutputTypes } from "@/prisma/contract";
import { db } from "@/prisma/db";
import { NextRequest } from "next/server";

export type CorrectGuessResponse = {
  correctGuesses: FieldOutputTypes["public"]["CorrectGuess"][];
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const roomId = parseInt(searchParams.get("roomId")!, 10);
  const puzzleId = parseInt(searchParams.get("puzzleId")!, 10);

  if (!roomId || !puzzleId || isNaN(roomId) || isNaN(puzzleId)) {
    return new Response(
      JSON.stringify({ error: "Invalid roomId or puzzleId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const correctGuesses = await db.orm.public.CorrectGuess.where({
    roomId,
    puzzleId,
  }).all();
  const response: CorrectGuessResponse = {
    correctGuesses,
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
