import { useContext, useEffect } from "react";
import useSWR from "swr";
import { PuzzleIdContext } from "../contexts/PuzzleIdContext";
import { ShuffledLettersContext } from "../contexts/ShuffledLettersContext";
import { Puzzle } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { shuffle } from "../utils/shuffle";

export const usePuzzle = () => {
  const [puzzleId, setPuzzleId] = useContext(PuzzleIdContext);
  const { data, error } = useSWR<Puzzle[]>(
    puzzleId ? `/rest/v1/puzzle?id=eq.${puzzleId}&select=*` : null,
    fetcher
  );
  const [shuffledLetters, setShuffledLetters] = useContext(
    ShuffledLettersContext
  );

  useEffect(() => {
    if (!data) return;
    setShuffledLetters(data[0].outer_letters as string[]);
  }, [data, setShuffledLetters]);

  function shuffleOuterLetters() {
    setShuffledLetters(shuffle(shuffledLetters));
  }

  return {
    puzzle: data?.[0],
    isLoading: !error && !data,
    isError: error,
    shuffle: shuffleOuterLetters,
    shuffledLetters,
    setPuzzleId,
  };
};
