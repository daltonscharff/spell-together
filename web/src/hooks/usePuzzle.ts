import useSWR from "swr";
import { Puzzle } from "../types/supabase";
import fetcher from "../utils/fetcher";

export const usePuzzle = (puzzleId: string | undefined) => {
  const { data, error } = useSWR<Puzzle[]>(
    puzzleId ? `/rest/v1/puzzle?id=eq.${puzzleId}&select=*` : null,
    fetcher
  );

  return {
    puzzle: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
