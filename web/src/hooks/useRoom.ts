import useSWR from "swr";
import { Room } from "../types/supabase";
import fetcher from "../utils/fetcher";

export const useRoom = (shortcode: string) => {
  const { data, error } = useSWR<Room[]>(
    `/rest/v1/room?shortcode=eq.${shortcode}&select=*`,
    fetcher
  );

  return {
    room: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
