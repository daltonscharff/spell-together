import { useEffect } from "react";
import useSWR from "swr";
import { Room } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { usePuzzle } from "./usePuzzle";
import { useLocalStore } from "./useLocalStore";

export const useRoom = () => {
  const { setPuzzleId } = usePuzzle();
  const shortcode = useLocalStore((state) => state.shortcode);
  const { data, error } = useSWR<Room[]>(
    shortcode
      ? `/rest/v1/room?shortcode=eq.${shortcode.toLowerCase()}&select=*`
      : null,
    fetcher
  );

  useEffect(() => {
    const puzzleId = data?.[0]?.puzzle_id || null;
    setPuzzleId(puzzleId);
  }, [data, setPuzzleId]);

  return {
    room: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
