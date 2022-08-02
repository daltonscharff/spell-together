import create from "zustand";
import { persist } from "zustand/middleware";

export const useLocalStore = create(
  persist(
    () => ({
      username: "",
      shortcode: "",
    }),
    {
      name: "spell-together",
    }
  )
);
