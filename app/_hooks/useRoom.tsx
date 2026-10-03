import useSWR from "swr";
import { fetcher } from "../_utils/fetcher";
import { RoomResponse } from "../api/rooms/[shortcode]/route";

export type Room = RoomResponse;
export function useRoom(shortcode: string) {
  const { data, error, isLoading } = useSWR<RoomResponse>(
    shortcode ? `/api/rooms/${shortcode}` : null,
    fetcher,
  );

  return { room: data, error, isLoading };
}
