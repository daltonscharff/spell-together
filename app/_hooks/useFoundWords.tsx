import { FieldOutputTypes } from "@/prisma/contract";
import { CorrectGuessResponse } from "../api/correctGuesses/route";
import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { usePuzzle } from "./usePuzzle";
import { useMemo } from "react";

type Word = FieldOutputTypes["public"]["Word"];
type CorrectGuess = FieldOutputTypes["public"]["CorrectGuess"];
export type FoundWord = Omit<Word, "createdAt" | "updatedAt"> &
  Pick<CorrectGuess, "submittedAt" | "submittedBy">;

export function useFoundWords(
  roomId?: number | null,
  puzzleId?: number | null,
) {
  const {
    puzzle,
    wordIdMap,
    isLoading: isPuzzleLoading,
    error: puzzleError,
  } = usePuzzle(puzzleId);
  const {
    data: correctGuesses,
    isLoading,
    error,
    mutate: mutateCorrectGuesses,
  } = useSWR<CorrectGuessResponse>(
    roomId && puzzleId
      ? `/api/correctGuesses?roomId=${roomId}&puzzleId=${puzzleId}`
      : null,
    fetcher,
  );

  const foundWords = useMemo(
    () =>
      correctGuesses?.correctGuesses
        .map((guess) => {
          const word = wordIdMap.get(guess.wordId);
          if (!word) return null;
          return {
            ...word,
            submittedAt: guess.submittedAt,
            submittedBy: guess.submittedBy,
          };
        })
        .filter((word) => word !== null) ?? [],
    [correctGuesses, puzzle],
  );

  return {
    foundWords,
    score: foundWords.reduce((acc, word) => acc + word.pointValue, 0),
    isLoading: isLoading || isPuzzleLoading,
    error: error || puzzleError,
    mutateCorrectGuesses,
  };
}
