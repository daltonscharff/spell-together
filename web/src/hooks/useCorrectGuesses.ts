import { useEffect } from "react";
import useSWR from "swr";
import { CorrectGuess, Guess } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { supabase } from "../utils/supabaseClient";
import { useRoom } from "./useRoom";

export const useCorrectGuesses = () => {
  const { room } = useRoom();
  const roomId = room?.id;
  const { data, error, mutate } = useSWR<CorrectGuess[]>(
    roomId ? `/rest/v1/correct_guess?room_id=eq.${roomId}&select=*` : null,
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
