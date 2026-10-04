import { fetcher } from "../_utils/fetcher";
import { PuzzlesResponse } from "../api/puzzles/route";
import useSWRImmutable from "swr/immutable";

export type Puzzles = PuzzlesResponse["puzzles"];
export function usePuzzles() {
  const { data, error, isLoading } = useSWRImmutable<PuzzlesResponse>(
    "/api/puzzles",
    fetcher,
  );

  return { puzzles: data?.puzzles, error, isLoading };
}
