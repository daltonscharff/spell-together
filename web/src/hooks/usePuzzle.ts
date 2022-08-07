import useSWR from "swr";
import { Puzzle } from "../types/supabase";
import fetcher from "../utils/fetcher";

export const usePuzzle = () => {
  const puzzlesToLoad = 1;
  const { data, error } = useSWR<Puzzle[]>(
    `/rest/v1/newest_puzzle?select=*&limit=${puzzlesToLoad}`,
    fetcher
  );

  return {
    puzzle: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
