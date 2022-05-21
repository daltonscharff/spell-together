import { useContext, useEffect } from "react";
import useSWR from "swr";
import {
  Record,
  RoomContext,
  RoomWithoutRecords,
} from "../contexts/RoomContext";
import fetcher from "../utils/fetcher";
import { socket, useSocket } from "./useSocket";

export const useRoom = (shortcode?: string) => {
  const [room, setRoom] = useContext(RoomContext);

  const { data: roomData, error: roomError } = useSWR<RoomWithoutRecords>(
    shortcode && `/api/rooms/${shortcode}`,
    fetcher
  );
  const { data: recordsData, error: recordsError } = useSWR<Record[]>(
    shortcode && `/api/records/${shortcode}`,
    fetcher
  );

  const error = roomError || recordsError;
  const loading = !shortcode
    ? false
    : (!roomData && !roomError) || (!recordsData && !recordsError);

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

  useEffect(() => {
    if (shortcode) {
      console.log("JOINING ROOM", shortcode);
      socket.emit("user:joinRoom", {
        username: "test",
        shortcode,
      });
    }
  }, [shortcode]);

  function guessWord(word: string) {
    console.log("Guessing");
    socket.emit("user:guess", {
      username: "test",
      shortcode,
      word,
    });
  }

  useSocket("incorrectGuess", (data) => console.log("incorrectGuess", data));

  return {
    ...room,
    loading,
    error,
    guessWord,
  };
};
