export default async function fetcher(endpoint: string) {
  const base = process.env.REACT_APP_SERVER_URL || "";
  const res = await fetch(new URL(endpoint, base).href);
  if (res.status >= 400) {
    throw new Error(res.statusText);
  }
  return res.json();
}
