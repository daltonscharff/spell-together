import create from "zustand";
import dayjs from "dayjs";
import { socket } from "./useSocket";
import store, { StoreState } from "../store";

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

socket.on("updateFoundWords", ({ foundWords }: { foundWords: any[] }) => {
  useStore.setState({
    score: foundWords.reduce((total, { pointValue }) => total + pointValue, 0),
  });
  useStore.setState({ foundWords });
});

export const useStore = create<StoreState>(store);
export default useStore;
