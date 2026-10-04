import { fetcher } from "../_utils/fetcher";
import { RoomResponse } from "../api/rooms/[shortcode]/route";
import useSWRImmutable from "swr/immutable";

export type Room = RoomResponse;
export function useRoom(shortcode: string) {
  const { data, error, isLoading } = useSWRImmutable<RoomResponse>(
    shortcode ? `/api/rooms/${shortcode}` : null,
    fetcher,
  );

  return { room: data, error, isLoading };
}
