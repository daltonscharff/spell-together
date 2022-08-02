import create from "zustand";
import { persist } from "zustand/middleware";

export const useLocalStore = create<{
  username: string;
  shortcode: string;
  setShortcode: (shortcode: string) => void;
}>()(
  persist(
    (set) => ({
      username: "",
      shortcode: "",
      setShortcode: (shortcode: string) => {
        set({ shortcode: shortcode.toLowerCase() });
      },
    }),
    {
      name: "spell-together",
      partialize: (state) => ({
        username: state.username,
        shortcode: state.shortcode,
      }),
    }
  )
);
