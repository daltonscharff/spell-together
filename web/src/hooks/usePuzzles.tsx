import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import type { Puzzle } from "../types/database.types";

export function usePuzzles() {
  const { data, error } = useSWR<Puzzle[]>("puzzle", fetcher);

  return { puzzles: data, loading: !data && !error, error };
}
