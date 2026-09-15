import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import type { Guess } from "../types/database.types";
import supabase from "../utils/supabase";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { useEffect } from "react";

export function useGuesses(roomId?: string, puzzleId?: string) {
  const key = `guess?room_id=eq.${roomId}&puzzle_id=eq.${puzzleId}`;
  const { data, error, mutate } = useSWR<Guess[]>(
    roomId && puzzleId !== undefined ? key : null,
    fetcher
  );

  function revalidate() {
    mutate();
  }

  // TODO: fix db broadcasting on insert
  // TODO: check that frontend receives broadcasts from db
  const channelName = `${roomId}_${puzzleId}`;
  const channel = supabase.channel(channelName);
  console.log("listening to channel:", channelName);
  if (roomId && puzzleId) {
    supabase.removeAllChannels();
    channel
      .on(
        REALTIME_LISTEN_TYPES.BROADCAST,
        { event: "INSERT" },
        (payload: { [key: string]: any }) => {
          // const { NEW: newGuess } = payload;
          console.log("payload received", payload);
          // mutate([...(data ?? []), newGuess], { revalidate: false });
        }
      )
      .subscribe();
  }

  useEffect(() => {
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { guesses: data, loading: !data && !error, error, revalidate };
}
