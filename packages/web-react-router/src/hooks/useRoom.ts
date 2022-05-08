import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

type Room = {
  id: string;
  createdAt: string;
  lastPlayed: string;
  shortcode: string;
  name: string | null;
};
type Record = {
  id: string;
  createdAt: string;
  username: string;
  roomId: string;
  wordId: string;
};

export const useRoom = (shortcode?: string) => {
  const [room, setRoom] = useState({});

  const { data: roomData, error: roomError } = useSWR<Room>(
    `/api/rooms/${shortcode}`,
    fetcher
  );
  const { data: recordsData, error: recordsError } = useSWR<Record[]>(
    `/api/records/${shortcode}`,
    fetcher
  );

  const error = roomError || recordsError;
  const loading = (!roomData && !roomError) || (!recordsData && !recordsError);

  useEffect(() => {
    if (roomData) {
      setRoom((room) => ({ ...room, ...roomData }));
    }
  }, [setRoom, roomData]);

  useEffect(() => {
    if (recordsData) {
      setRoom((room) => ({ ...room, records: recordsData }));
    }
  }, [setRoom, recordsData]);

  return {
    ...room,
    loading,
    error,
  };
};
