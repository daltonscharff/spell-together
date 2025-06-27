import useSWRImmutable from "swr/immutable";
import { fetcher } from "../utils/fetcher";
import type { Room } from "../types/database.types";

export function useRoom(shortcode?: string) {
  const { data, error } = useSWRImmutable<Room[]>(
    shortcode !== undefined ? `room?shortcode=eq.${shortcode}` : null,
    fetcher
  );

  return { room: data?.[0], loading: !data && !error, error };
}
