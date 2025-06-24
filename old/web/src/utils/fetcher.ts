export default async function fetcher(endpoint: string) {
  const base = process.env.REACT_APP_SUPABASE_URL || "";
  try {
    const res = await fetch(new URL(endpoint, base).href, {
      headers: {
        apikey: process.env.REACT_APP_SUPABASE_ANON_KEY ?? "",
      },
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
}
