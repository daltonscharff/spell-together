import { createContext, FC, useState, Dispatch, SetStateAction } from "react";

export type Word = {
  id: string;
  word: string;
  pointValue: number;
  isPangram: boolean;
  definition: string | null;
  partOfSpeech: string | null;
  synonym: string | null;
};
export type Record = {
  id: string;
  createdAt: string;
  username: string;
  word: Word;
};
export type Room = {
  id: string;
  createdAt: string;
  lastPlayed: string;
  shortcode: string;
  name: string | null;
  records: Record[];
};
export type RoomWithoutRecords = Omit<Room, "records">;

export const defaultRoom: Room = {
  id: "",
  createdAt: "",
  lastPlayed: "",
  shortcode: "",
  name: null,
  records: [],
};

export const RoomContext = createContext<
  [Room, Dispatch<SetStateAction<Room>>]
>([defaultRoom, () => {}]);

export const RoomProvider: FC = ({ children }) => {
  const [room, setRoom] = useState<Room>(defaultRoom);
  return (
    <RoomContext.Provider value={[room, setRoom]}>
      {children}
    </RoomContext.Provider>
  );
};
