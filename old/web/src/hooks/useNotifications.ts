import create from "zustand";

export const useNotifications = create<{
  guessResponse?: { correct: boolean; word: string; message?: string };
  guessResponseTimeout?: NodeJS.Timeout;
  setGuessResponse: (correct: boolean, word: string, message?: string) => void;
}>()((set, get) => ({
  guessResponse: undefined,
  setGuessResponse: (correct: boolean, word: string, message?: string) => {
    clearTimeout(get().guessResponseTimeout);
    set({ guessResponse: { correct, word, message } });
    set({
      guessResponseTimeout: setTimeout(
        () => set({ guessResponse: undefined }),
        3000
      ),
    });
  },
}));
