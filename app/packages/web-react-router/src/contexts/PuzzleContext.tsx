import { createContext, FC, useState } from "react";

export type Puzzle = {
  id: string;
  date: string;
  outerLetters: string[];
  centerLetter: string;
  maxScore: number;
};

const defaultPuzzle: Puzzle = {
  id: "",
  date: "",
  outerLetters: [],
  centerLetter: "",
  maxScore: 0,
};

export const PuzzleContext = createContext<[Puzzle, (state: Puzzle) => void]>([
  defaultPuzzle,
  () => {},
]);

export const PuzzleProvider: FC = ({ children }) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(defaultPuzzle);
  return (
    <PuzzleContext.Provider value={[puzzle, setPuzzle]}>
      {children}
    </PuzzleContext.Provider>
  );
};
