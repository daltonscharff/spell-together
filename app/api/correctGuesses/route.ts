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
  })
    .orderBy((guess) => guess.submittedAt.desc())
    .all();
  const response: CorrectGuessResponse = {
    correctGuesses,
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { roomId, puzzleId, wordId, submittedBy } = body;

  if (!roomId || !puzzleId || !wordId || !submittedBy) {
    return new Response(
      JSON.stringify({
        error: "Missing roomId, puzzleId, wordId, or submittedBy",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const correctGuess = await db.orm.public.CorrectGuess.create({
    roomId,
    puzzleId,
    wordId,
    submittedBy,
  }).catch((error) => {
    console.error("Error creating correct guess:", error);
    switch (error.code) {
      case "P2002":
        return new Response(
          JSON.stringify({
            error: "Duplicate correct guess",
            details: error.message,
            code: error.code,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      case "P2003":
        return new Response(
          JSON.stringify({
            error: "Foreign key constraint failed",
            details: error.message,
            code: error.code,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      default:
        return new Response(
          JSON.stringify({
            error: "Failed to create correct guess",
            details: error.message,
            code: error.code ?? "UNKNOWN",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
    }
  });

  return new Response(JSON.stringify({ correctGuess }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
