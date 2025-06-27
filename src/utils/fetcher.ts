const HOST = "http://127.0.0.1:54321";

export const fetcher = (resource: string) => {
  const url = `${HOST}/rest/v1/${resource}`;
  return fetch(url).then((res) => res.json());
};
