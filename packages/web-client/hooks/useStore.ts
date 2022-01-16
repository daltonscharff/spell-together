import create from "zustand";
import dayjs from "dayjs";
import { FoundWord } from "@daltonscharff/spelling-bee-core";
import { socket } from "./useSocket";

type StoreState = {
  username?: string;
  roomCode?: string;
  outerLetters: string[];
  centerLetter: string;
  foundWords: FoundWord[];
  score: number;
  maxScore: number;
  date: string;
  hasLoaded: boolean;
};

const store = () => ({
  username: "Dalton",
  roomCode: "123456",
  outerLetters: [],
  centerLetter: "",
  foundWords: [],
  score: 0,
  maxScore: 0,
  date: "",
  hasLoaded: false,
});

socket.on(
  "updatePuzzle",
  ({ outerLetters, centerLetter, maxScore, createdAt }) => {
    useStore.setState({
      outerLetters,
      centerLetter,
      maxScore,
      date: dayjs(createdAt).format("MMMM D, YYYY"),
      hasLoaded: true,
    });
  }
);

socket.on("updateFoundWords", ({ foundWords }: { foundWords: FoundWord[] }) => {
  useStore.setState({
    score: foundWords.reduce((total, { pointValue }) => total + pointValue, 0),
  });
  useStore.setState({ foundWords });
});

export const useStore = create<StoreState>(store);
export default useStore;
