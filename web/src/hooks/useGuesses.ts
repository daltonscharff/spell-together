import { useEffect } from "react";
import useSWR from "swr";
import { CorrectGuess, Guess } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { supabase } from "../utils/supabaseClient";

type SubmitGuess = {
  username: string;
  roomId: string;
  puzzleId: string;
  word: string;
};

export const useGuesses = (roomId: string | undefined) => {
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

  async function submitGuess(guess: SubmitGuess) {
    return supabase.rpc<CorrectGuess>("submit_guess", {
      _room_id: guess.roomId,
      _puzzle_id: guess.puzzleId,
      _username: guess.username,
      _word: guess.word,
    });
  }

  return {
    correctGuesses: data,
    isLoading: !error && data === undefined,
    isError: error,
    submitGuess,
  };
};
