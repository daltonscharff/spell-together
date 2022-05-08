import { useContext, useEffect } from "react";
import useSWR from "swr";
import { Puzzle, PuzzleContext } from "../contexts/PuzzleContext";
import fetcher from "../utils/fetcher";

export const usePuzzle = () => {
  const [puzzle, setPuzzle] = useContext(PuzzleContext);

  const { data, error } = useSWR<Puzzle>(`/api/puzzles/newest`, fetcher);

  useEffect(() => {
    if (data) setPuzzle(data);
  }, [data, setPuzzle]);

  return {
    ...puzzle,
    error,
  };
};
