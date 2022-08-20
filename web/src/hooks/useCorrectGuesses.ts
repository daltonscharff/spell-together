import { useEffect } from "react";
import useSWR from "swr";
import create from "zustand";
import { CorrectGuess, Guess } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { supabase } from "../utils/supabaseClient";
import { usePuzzle } from "./usePuzzle";
import { useRoom } from "./useRoom";

const useCorrectGuessStore = create<{
  filteredGuesses: CorrectGuess[];
  selectedUser: string;
  setSelectedUser: (username: string) => void;
}>()((set, get) => ({
  filteredGuesses: [],
  selectedUser: "",
  setSelectedUser: (selectedUser: string) => {
    if (get().selectedUser === selectedUser) {
      set({ selectedUser: "" });
    } else {
      set({ selectedUser });
    }
  },
}));

export const useCorrectGuesses = () => {
  const { room } = useRoom();
  const { puzzle } = usePuzzle();
  const roomId = room?.id;
  const puzzleId = puzzle?.id;
  const { data, error, mutate } = useSWR<CorrectGuess[]>(
    roomId && puzzleId
      ? `/rest/v1/correct_guess?room_id=eq.${roomId}&puzzle_id=eq.${puzzleId}&order=word.asc&select=*`
      : null,
    fetcher
  );
  const selectedUser = useCorrectGuessStore((state) => state.selectedUser);

  useEffect(() => {
    if (!data) return;
    useCorrectGuessStore.setState({
      filteredGuesses: selectedUser
        ? data.filter((guess) => guess.username === selectedUser)
        : data,
    });
  }, [data, selectedUser]);

  useEffect(() => {
    const guessSubscription = supabase
      .from<Guess>(`guess:room_id=eq.${roomId}`)
      .on("INSERT", async (_) => {
        mutate();
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(guessSubscription);
    };
  }, [roomId, mutate]);

  return {
    correctGuesses: data,
    filteredGuesses: useCorrectGuessStore((state) => state.filteredGuesses),
    selectedUser: useCorrectGuessStore((state) => state.selectedUser),
    setSelectedUser: useCorrectGuessStore((state) => state.setSelectedUser),
    isLoading: !error && data === undefined,
    isError: error,
    mutate,
  };
};
