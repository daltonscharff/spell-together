import create from "zustand";

export const useNotifications = create<{
  guessResponse?: { correct: boolean; message?: string };
  guessResponseTimeout?: NodeJS.Timeout;
  setGuessResponse: (correct: boolean, message?: string) => void;
}>()((set, get) => ({
  guessResponse: undefined,
  setGuessResponse: (correct: boolean, message?: string) => {
    clearTimeout(get().guessResponseTimeout);
    set({ guessResponse: { correct, message } });
    set({
      guessResponseTimeout: setTimeout(
        () => set({ guessResponse: undefined }),
        3000
      ),
    });
  },
}));
