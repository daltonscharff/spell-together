import { useEffect, useState } from "react";
import { CorrectGuess, Guess } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

type SubmitGuess = {
  username: string;
  shortcode: string;
  word: string;
};

export const useGuesses = (shortcode: string) => {
  const [correctGuesses, setCorrectGuesses] = useState<CorrectGuess[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGuesses = async (shortcode: string) => {
      setLoading(true);
      const { data, error } = await supabase
        .from<CorrectGuess>("correct_guess")
        .select("*")
        .eq("shortcode", shortcode);
      if (data) setCorrectGuesses(data);
      setLoading(false);
    };
    loadGuesses(shortcode);

    const guessSubscription = supabase
      .from<CorrectGuess>(`correct_guess:shortcode=eq.${shortcode}`)
      .on("INSERT", (payload) => {
        console.log("Change received!", payload);
        addCorrectGuesses(payload.new);
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(guessSubscription);
    };
  }, [shortcode]);

  function addCorrectGuesses(...newCorrectGuesses: CorrectGuess[]) {
    setCorrectGuesses((guesses) => [...guesses, ...newCorrectGuesses]);
  }

  async function submitGuess(guess: SubmitGuess) {
    return supabase.rpc("submit_guess", {
      _shortcode: guess.shortcode,
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
