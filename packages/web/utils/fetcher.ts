export default async function fetcher(endpoint: string) {
  const url = "http://localhost:4000";
  const res = await fetch(`${url}${endpoint}`);
  return res.json();
}
