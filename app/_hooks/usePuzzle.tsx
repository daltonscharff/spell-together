import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { PuzzleResponse } from "../api/puzzles/[puzzleId]/route";
import { useMemo } from "react";

export type Puzzle = PuzzleResponse;
export function usePuzzle(id?: number | null) {
  const { data, error, isLoading } = useSWR<PuzzleResponse>(
    id ? `/api/puzzles/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const wordMap = useMemo(() => {
    return new Map<string, Puzzle["words"][number]>(
      data?.words.map((word) => [word.value, word]),
    );
  }, [data]);

  const wordIdMap = useMemo(() => {
    return new Map<number, Puzzle["words"][number]>(
      data?.words.map((word) => [word.id, word]),
    );
  }, [data]);

  return { puzzle: data, wordMap, wordIdMap, error, isLoading };
}
