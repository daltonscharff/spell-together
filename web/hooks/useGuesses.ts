import { useEffect, useState } from "react";
import { CorrectGuess, Guess } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

type SubmitGuess = {
  username: string;
  roomId: string;
  puzzleId: string;
  word: string;
};

export const useGuesses = (roomId: string) => {
  const [correctGuesses, setCorrectGuesses] = useState<CorrectGuess[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGuesses = async (roomId: string) => {
      setLoading(true);
      const { data, error } = await supabase
        .from<CorrectGuess>("correct_guess")
        .select("*")
        .eq("room_id", roomId);
      if (data) setCorrectGuesses(data);
      setLoading(false);
    };
    if (roomId) loadGuesses(roomId);

    const guessSubscription = supabase
      .from<Guess>(`guess:room_id=eq.${roomId}`)
      .on("INSERT", async (guess) => {
        console.log("Change received!", guess);
        const { data, error } = await supabase
          .from<CorrectGuess>("correct_guess")
          .select("*")
          .eq("guess_id", guess.new.id);
        if (data) addCorrectGuesses(...data);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(guessSubscription);
    };
  }, [roomId]);

  function addCorrectGuesses(...newCorrectGuesses: CorrectGuess[]) {
    setCorrectGuesses((guesses) => [...guesses, ...newCorrectGuesses]);
  }

  async function submitGuess(guess: SubmitGuess) {
    return supabase.rpc<CorrectGuess>("submit_guess", {
      _room_id: guess.roomId,
      _puzzle_id: guess.puzzleId,
      _username: guess.username,
      _word: guess.word,
    });
  }

  return {
    correctGuesses,
    loading,
    submitGuess,
  };
};
