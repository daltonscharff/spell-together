import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import type { Room } from "../types/database.types";

export function useRoom(shortcode: string) {
  const { data, error } = useSWR<Room[]>(
    `room?shortcode=eq.${shortcode}`,
    fetcher
  );

  return { room: data?.[0], loading: !data && !error, error };
}
