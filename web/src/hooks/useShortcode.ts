import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Room } from "../types/supabase";
import { ShortcodeContext } from "../contexts/ShortcodeContext";

export const useShortcode = () => {
  const [shortcode, setShortcodeState] = useContext(ShortcodeContext);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shortcode) return;
    validateShortcode(shortcode).then((isValid) => setIsValid(isValid));
  }, [shortcode]);

  async function setShortcode(shortcode: string) {
    localStorage.setItem("shortcode", shortcode);
    setShortcodeState(shortcode);
  }

  async function unsetShortcode() {
    localStorage.removeItem("shortcode");
    setShortcodeState(null);
  }

  async function validateShortcode(shortcode: string) {
    setLoading(true);
    const { count } = await supabase
      .from<Room>("room")
      .select("*", { count: "exact" })
      .eq("shortcode", shortcode);
    setLoading(false);
    return !!count;
  }

  return {
    shortcode,
    isValid,
    setShortcode,
    unsetShortcode,
    loading,
  };
};