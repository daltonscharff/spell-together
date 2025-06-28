import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

Object.entries({ SUPABASE_URL, SUPABASE_ANON_KEY }).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing env variable: ${key}`);
});

export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

export default supabase;
