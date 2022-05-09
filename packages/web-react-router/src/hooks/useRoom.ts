import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import {
  Room,
  Record,
  RoomContext,
  RoomWithoutRecords,
} from "../contexts/RoomContext";
import fetcher from "../utils/fetcher";

export const useRoom = (shortcode?: string) => {
  const [room, setRoom] = useContext(RoomContext);

  // TODO: only load if shortcode is not undefined
  const { data: roomData, error: roomError } = useSWR<RoomWithoutRecords>(
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
      // @ts-ignore
      setRoom((room: Room) => ({ ...room, ...roomData }));
    }
  }, [setRoom, roomData]);

  useEffect(() => {
    if (recordsData) {
      // @ts-ignore
      setRoom((room: Room) => ({ ...room, records: recordsData }));
    }
  }, [setRoom, recordsData]);

  return {
    ...room,
    loading,
    error,
  };
};
