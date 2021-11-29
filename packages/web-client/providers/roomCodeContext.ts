import { createContext } from "react";

export const RoomCodeContext = createContext({
  roomCode: "",
  setRoomCode: (x: string) => {},
});

export default RoomCodeContext;
