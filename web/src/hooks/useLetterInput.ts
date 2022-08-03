import create from "zustand";

export const useLetterInput = create<{
  letters: string;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  clearLetters: () => void;
}>()((set) => ({
  letters: "",
  addLetter: (letter: string) => {
    set((state) => ({
      letters:
        state.letters.length <= 22
          ? state.letters + letter.toLowerCase()
          : state.letters,
    }));
  },
  removeLetter: () => {
    set((state) => ({ letters: state.letters.slice(0, -1) }));
  },
  clearLetters: () => {
    set({ letters: "" });
  },
}));
