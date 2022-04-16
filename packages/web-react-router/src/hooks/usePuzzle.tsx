import useSWR from "swr";
import fetcher from "../utils/fetcher";

export type Puzzle = {
  date: string;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;
} | null;

export const usePuzzle = () => {
  const { error, data } = useSWR<Puzzle>("/api/puzzles/newest", fetcher);

  return {
    loading: !(error || data),
  };
};
