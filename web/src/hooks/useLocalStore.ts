import create from "zustand";
import { persist } from "zustand/middleware";

export const useLocalStore = create<{
  username: string;
  shortcode: string;
}>()(
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
