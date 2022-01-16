import create from "zustand";

type StoreState = {
  username?: string;
  roomCode?: string;
  outerLetters: string[];
  centerLetter: string;
  foundWords: string[];
  score: number;
  maxScore: number;
};

const store = () => ({
  username: "Dalton",
  outerLetters: ["b", "c", "d", "e", "f", "g"],
  centerLetter: "a",
  foundWords: ["CAGE", "ADAGE", "BABE", "CAGED", "BAGGAGE", "CABBAGE", "BADGE"],
  score: 10,
  maxScore: 121,
});

export const useStore = create<StoreState>(store);
export default useStore;
