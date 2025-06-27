import useSWRImmutable from "swr/immutable";
import { fetcher } from "../utils/fetcher";
import type { Puzzle } from "../types/database.types";

export function usePuzzles() {
  const { data, error } = useSWRImmutable<Puzzle[]>("puzzle", fetcher);

  return { puzzles: data, loading: !data && !error, error };
}
