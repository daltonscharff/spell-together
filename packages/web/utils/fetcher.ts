export default async function fetcher(endpoint: string) {
  const url = "http://localhost:4000";
  const res = await fetch(`${url}${endpoint}`);
  return res.json();
}

export async function fetcherWithShortcode(
  endpoint: string,
  shortcode?: string | string[]
) {
  if (!shortcode) return undefined;
  if (typeof shortcode !== "string") return [];
  return fetcher(`${endpoint}/${shortcode}`);
}
