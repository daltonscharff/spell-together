import { useContext } from "react";
import { PuzzleContext } from "../contexts/PuzzleContext";

export const usePuzzle = () => {
  const [puzzle, setPuzzle] = useContext(PuzzleContext);

  function loadData() {
    console.log("Loading Data");
    setPuzzle({
      ...puzzle,
      outerLetters: ["a", "b", "c", "d", "e", "f"],
      centerLetter: "g",
    });
  }

  return {
    ...puzzle,
    loadData,
  };
};
