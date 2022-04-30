import fetcher from "../utils/fetcher";
import {
  Room,
  Record,
  Puzzle,
} from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { useState } from "react";

export const useRoom = (shortcode?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<Room>();
  const [puzzleData, setPuzzleData] = useState<Puzzle>();
  const [recordsData, setRecordsData] = useState<Record[]>();
  const [data, setData] = useState({ room: {}, puzzle: {}, records: [] });

  async function loadRoom() {
    setLoading(true);

    const room = await fetcher(`/api/rooms/${shortcode}`);
    const puzzle = await fetcher(`/api/puzzles/newest`);
    const records = await fetcher(`/api/records/${shortcode}`);
    setData({ room, puzzle, records });

    setLoading(false);
  }

  async function clearRecords() {
    setRecordsData([]);
  }

  return {
    data,
    loading,
    loadRoom,
    roomData,
    puzzleData,
    recordsData,
    clearRecords,
  };
};
