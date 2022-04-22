import fetcher from "../utils/fetcher";
import {
  Room,
  Record,
  Puzzle,
} from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { useState } from "react";

export const useRoom = (shortcode: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [puzzleData, setPuzzleData] = useState<Puzzle | null>(null);
  const [recordsData, setRecordsData] = useState<Record[] | null>(null);

  async function loadRoom() {
    setLoading(true);

    setRoomData(await fetcher(`/api/rooms/${shortcode}`));
    setPuzzleData(await fetcher(`/api/puzzles/newest`));
    setRecordsData(await fetcher(`/api/records/${shortcode}`));

    setLoading(false);
  }

  async function clearRecords() {
    setRecordsData([]);
  }

  return {
    loading,
    loadRoom,
    roomData,
    puzzleData,
    recordsData,
    clearRecords,
  };
};
