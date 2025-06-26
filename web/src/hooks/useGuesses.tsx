import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import type { Guess } from "../types/database.types";

export function useGuesses(roomId?: string, puzzleId?: string) {
  const { data, error } = useSWR<Guess[]>(
    roomId && puzzleId !== undefined
      ? `guess?room_id=eq.${roomId}&puzzle_id=eq.${puzzleId}`
      : null,
    fetcher
  );

  return { guesses: data, loading: !data && !error, error };
}
