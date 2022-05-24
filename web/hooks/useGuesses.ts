import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

export const useGuesses = (roomId: string) => {
  const [guesses, setGuesses] = useState<definitions["guess"][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGuesses();
    console.log("adding subscription");
    const guessSubscription = supabase
      .from(`guess:room_id=eq.${roomId}`)
      .on("INSERT", (payload) => {
        console.log("Change received!", payload);
        addGuesses(payload.new);
      })
      .subscribe();
    return () => {
      console.log("removing subscription");
      supabase.removeSubscription(guessSubscription);
    };
  }, [roomId]);

  async function loadGuesses() {
    setLoading(true);
    const guessQuery = await supabase.from("guess").select("*, word(*)");
    console.log(guessQuery);
    // if (data) setGuesses(data);
    setLoading(false);
  }

  function addGuesses(...newGuesses: definitions["guess"][]) {
    setGuesses((guesses) => [...guesses, ...newGuesses]);
  }

  return {
    guesses,
    loading,
  };
};
