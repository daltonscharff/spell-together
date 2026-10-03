import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { PuzzleResponse } from "../api/puzzles/[puzzleId]/route";

export type Puzzle = PuzzleResponse;
export function usePuzzle(id?: number | null) {
  const { data, error, isLoading } = useSWR<PuzzleResponse>(
    id ? `/api/puzzles/${id}` : null,
    fetcher,
  );

  return { puzzle: data, error, isLoading };
}
