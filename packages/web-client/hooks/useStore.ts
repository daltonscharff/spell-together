import create from "zustand";
import dayjs from "dayjs";
import { socket } from "./useSocket";
import { Record, Word } from "@daltonscharff/spelling-bee-core";

export type FoundWord = Omit<
  Word,
  "id" | "createdAt" | "updatedAt" | "records"
> &
  Pick<Record, "user">;

type StoreState = {
  username?: string;
  roomCode?: string;
  outerLetters: string[];
  centerLetter: string;
  foundWords: FoundWord[];
  score: number;
  maxScore: number;
  date: string;
};

const store = () => ({
  username: "Dalton",
  outerLetters: [],
  centerLetter: "",
  foundWords: [],
  score: 0,
  maxScore: 0,
  date: "",
});

socket.on(
  "updatePuzzle",
  ({ outerLetters, centerLetter, maxScore, createdAt }) => {
    useStore.setState({
      outerLetters,
      centerLetter,
      maxScore,
      date: dayjs(createdAt).format("MMMM D, YYYY"),
    });
  }
);

socket.on("updateFoundWords", ({ foundWords }) => {});

export const useStore = create<StoreState>(store);
export default useStore;
