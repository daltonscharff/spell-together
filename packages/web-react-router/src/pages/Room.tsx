import { useParams } from "react-router-dom";
import { useStore } from "../store";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export function Room() {
  let params = useParams();
  const setShortcode = useStore((state) => state.setShortcode);
  if (params.shortcode) setShortcode(params.shortcode);
  const shortcode = useStore((state) => state.shortcode);

  const { data: puzzleData, error: puzzleError } = useSWR(
    "api/puzzles/newest",
    fetcher
  );

  console.log({ puzzleData, puzzleError });

  const { data: roomData, error: roomError } = useSWR(
    `api/rooms/${shortcode}`,
    fetcher
  );

  console.log({ roomData, roomError });

  return <>Room {shortcode}</>;
}
