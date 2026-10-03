import { createContext, useContext } from "react";

export const SelectedPuzzleIdContext = createContext<{
  selectedPuzzleId: number | null;
  setSelectedPuzzleId: (id: number | null) => void;
}>({
  setSelectedPuzzleId: () => {},
  selectedPuzzleId: null,
});

export const useSelectedPuzzleIdContext = () =>
  useContext(SelectedPuzzleIdContext);
