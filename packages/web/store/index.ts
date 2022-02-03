export type StoreState = {
  username?: string;
  roomCode?: string;
  outerLetters: string[];
  centerLetter: string;
  foundWords: any[];
  score: number;
  maxScore: number;
  date: string;
  hasLoaded: boolean;
};

export const store = () => ({
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

export default store;
