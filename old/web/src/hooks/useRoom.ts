import useSWR from "swr";
import { Room } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { useLocalStore } from "./useLocalStore";

export const useRoom = () => {
  const shortcode = useLocalStore((state) => state.shortcode);
  const { data, error } = useSWR<Room[]>(
    shortcode
      ? `/rest/v1/room?shortcode=eq.${shortcode.toLowerCase()}&select=*`
      : null,
    fetcher
  );

  return {
    room: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
