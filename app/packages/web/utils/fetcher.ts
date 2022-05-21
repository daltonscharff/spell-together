export default async function fetcher(endpoint: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || "";
  try {
    const res = await fetch(new URL(endpoint, base).href);
    return res.json();
  } catch (e) {
    console.log(e);
  }
}
