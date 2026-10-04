import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { PuzzlesResponse } from "../api/puzzles/route";

export type Puzzles = PuzzlesResponse["puzzles"];
export function usePuzzles() {
  const { data, error, isLoading } = useSWR<PuzzlesResponse>(
    "/api/puzzles",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return { puzzles: data?.puzzles, error, isLoading };
}
