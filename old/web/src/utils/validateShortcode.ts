import { supabase } from "./supabaseClient";

export async function validateShortcode(shortcode: string) {
  const { count } = await supabase
    .from("room")
    .select("*", { count: "exact" })
    .eq("shortcode", shortcode.toLowerCase());
  return !!count;
}
