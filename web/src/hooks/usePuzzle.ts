import { useEffect } from "react";
import useSWR from "swr";
import create from "zustand";
import { Puzzle } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { shuffle } from "../utils/shuffle";

const usePuzzleStore = create<{
  centerLetter: string;
  outerLetters: string[];
  shuffleLetters: () => void;
}>()((set) => ({
  centerLetter: "",
  outerLetters: Array(6).fill(""),
  shuffleLetters: () => {
    set((state) => ({ outerLetters: shuffle(state.outerLetters) }));
  },
}));

export const usePuzzle = () => {
  const { data, error } = useSWR<Puzzle[]>(
    "/rest/v1/newest_puzzle?select=*&limit=1",
    fetcher
  );

  useEffect(() => {
    if (!data) return;
    usePuzzleStore.setState({
      outerLetters: data[0].outer_letters as string[],
      centerLetter: data[0].center_letter,
    });
  }, [data]);

  return {
    puzzle: data?.[0],
    isLoading: !error && !data,
    isError: error,
    centerLetter: usePuzzleStore((state) => state.centerLetter),
    outerLetters: usePuzzleStore((state) => state.outerLetters),
    shuffleLetters: usePuzzleStore((state) => state.shuffleLetters),
  };
};
