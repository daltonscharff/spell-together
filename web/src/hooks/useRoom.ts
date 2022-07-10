import { useEffect } from "react";
import useSWR from "swr";
import { Room } from "../types/supabase";
import fetcher from "../utils/fetcher";
import { usePuzzle } from "./usePuzzle";
import { useShortcode } from "./useShortcode";

export const useRoom = () => {
  const { setPuzzleId } = usePuzzle();
  const { shortcode } = useShortcode();
  const { data, error } = useSWR<Room[]>(
    shortcode ? `/rest/v1/room?shortcode=eq.${shortcode}&select=*` : null,
    fetcher
  );

  useEffect(() => {
    const puzzleId = data?.[0].puzzle_id || null;
    setPuzzleId(puzzleId);
  }, [data, setPuzzleId]);

  return {
    room: data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
};
