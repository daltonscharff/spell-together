import create from "zustand";

type StoreState = {
  username?: string;
  setUsername: (name: string) => void;
  roomCode?: string;
  setRoomCode: (code: string) => void;
  letters: string[];
  centerLetter: string;
  foundWords: string[];
  score: number;
  maxScore: number;
};

export const useStore = create<StoreState>((set) => ({
  setUsername: (name) =>
    set(() => {
      username: name;
    }),
  setRoomCode: (code) =>
    set(() => {
      roomCode: code;
    }),
  username: "Dalton",
  letters: ["b", "c", "d", "e", "f", "g"],
  centerLetter: "a",
  foundWords: ["ADAGE", "CAGE", "BABE"],
  score: 10,
  maxScore: 121,
}));

export default useStore;
