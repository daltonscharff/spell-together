import create from "zustand";
import { combine } from "zustand/middleware";

export const useStore = create(
  combine(
    {
      username: localStorage.getItem("username") || "",
      shortcode: localStorage.getItem("shortcode") || "",
    },
    (set) => ({
      setUsername: (username: string) => {
        set((_) => ({ username }));
        localStorage.setItem("username", username);
      },
      setShortcode: (shortcode: string) => {
        shortcode = shortcode.toLowerCase();
        set((_) => ({ shortcode }));
        localStorage.setItem("shortcode", shortcode);
      },
    })
  )
);

export default useStore;
