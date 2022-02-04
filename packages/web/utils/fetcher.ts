export default async function fetcher(endpoint: string) {
  const base = process.env.NEXT_PUBLIC_SOCKET_URL || "";
  const res = await fetch(new URL(endpoint, base).href);
  return res.json();
}
