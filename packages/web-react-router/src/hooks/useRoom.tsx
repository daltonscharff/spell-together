import useSWR from "swr";
import fetcher from "../utils/fetcher";
import {
  Room,
  Record,
  Puzzle,
} from "@daltonscharff/spelling-bee-shared/lib/interfaces";

export const useRoom = (shortcode: string) => {
  // move these to `loadRoom`, `loadPuzzle`, `loadRecords` functions
  const { error: roomError, data: roomData } = useSWR<Room>(
    `/api/rooms/${shortcode}`,
    fetcher
  );
  const { error: puzzleError, data: puzzleData } = useSWR<Puzzle>(
    `/api/puzzles/newest`,
    fetcher
  );
  const { error: recordsError, data: recordsData } = useSWR<Record[]>(
    `/api/records/${shortcode}`,
    fetcher
  );

  const loading =
    !(roomError || roomData) &&
    !(puzzleError || puzzleData) &&
    !(recordsError || recordsData);

  return {
    roomData,
    roomError,
    puzzleData,
    puzzleError,
    recordsData,
    recordsError,
    loading,
  };
};
