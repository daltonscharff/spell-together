import { fetcher } from "../_utils/fetcher";
import { PuzzleResponse } from "../api/puzzles/[puzzleId]/route";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";

export type Puzzle = PuzzleResponse;
export function usePuzzle(id?: number | null) {
  const { data, error, isLoading } = useSWRImmutable<PuzzleResponse>(
    id ? `/api/puzzles/${id}` : null,
    fetcher,
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
