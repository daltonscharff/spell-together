import create from "zustand";
import { persist } from "zustand/middleware";

export const useLocalStore = create<{
  username: string;
  shortcode: string;
  expandedIndex: number;
}>()(
  persist(
    () => ({
      username: "",
      shortcode: "",
      expandedIndex: 1,
    }),
    {
      name: "spell-together",
    }
  )
);
