import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../utils/supabaseClient";
import { Room } from "../types/supabase";

export const useUser = () => {
  const [state, setState] = useContext(UserContext);

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setState({ ...state, username });
  }

  function setShortcode(shortcode: string) {
    if (shortcode === state.shortcode) return;
    localStorage.setItem("shortcode", shortcode);
    setState({ ...state, shortcode });
  }

  async function validateShortcode(shortcode: string) {
    const { count } = await supabase
      .from<Room>("room")
      .select("*", { count: "exact" })
      .eq("shortcode", shortcode);
    return !!count;
  }

  return {
    ...state,
    setUsername,
    setShortcode,
    validateShortcode,
  };
};
