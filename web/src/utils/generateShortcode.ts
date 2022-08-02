export async function generateShortcode(): Promise<string> {
  const endpoint = "/rest/v1/rpc/generate_shortcode";
  const base = process.env.REACT_APP_SUPABASE_URL || "";
  const res = await fetch(new URL(endpoint, base).href, {
    headers: {
      apikey: process.env.REACT_APP_SUPABASE_ANON_KEY ?? "",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      _length: "6",
    }),
  });
  return res.json();
}
