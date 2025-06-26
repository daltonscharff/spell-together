import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/fetcher";
import type { Guess } from "../types/database.types";

export function useGuesses(roomId?: string, puzzleId?: string) {
  const key = `guess?room_id=eq.${roomId}&puzzle_id=eq.${puzzleId}`;
  const { data, error } = useSWR<Guess[]>(
    roomId && puzzleId !== undefined ? key : null,
    fetcher
  );

  function revalidate() {
    mutate(key);
  }

  return { guesses: data, loading: !data && !error, error, revalidate };
}
