import { useEffect } from "react";
import useSWR from "swr";
import { CorrectGuess, Guess } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { supabase } from "../utils/supabaseClient";
import { usePuzzle } from "./usePuzzle";
import { useRoom } from "./useRoom";

export const useCorrectGuesses = () => {
  const { room } = useRoom();
  const { puzzle } = usePuzzle();
  const roomId = room?.id;
  const puzzleId = puzzle?.id;
  const { data, error, mutate } = useSWR<CorrectGuess[]>(
    roomId && puzzleId
      ? `/rest/v1/correct_guess?room_id=eq.${roomId}&puzzle_id=eq.${puzzleId}&select=*`
      : null,
    fetcher
  );

  useEffect(() => {
    const guessSubscription = supabase
      .from<Guess>(`guess:room_id=eq.${roomId}`)
      .on("INSERT", async (guess) => {
        console.log("Change received!", guess);
        mutate();
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(guessSubscription);
    };
  }, [roomId, mutate]);

  return {
    correctGuesses: data,
    isLoading: !error && data === undefined,
    isError: error,
  };
};
