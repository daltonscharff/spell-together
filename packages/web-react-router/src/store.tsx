import create from "zustand";
import { combine } from "zustand/middleware";

export const useStore = create(
  combine(
    {
      username: "Abcde",
      shortcode: "abc123",
    },
    (set) => ({
      setUsername: (username: string) => set((state) => ({ username })),
      setShortcode: (shortcode: string) => set((state) => ({ shortcode })),
    })
  )
);

export default useStore;
