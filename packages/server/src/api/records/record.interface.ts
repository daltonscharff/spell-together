import { Room } from "../rooms/room.interface";
import { Word } from "../words/word.interface";

export interface Record {
  createdAt: string;
  username: string;
  roomId: string;
  wordId: string;
  room: Room;
  word: Word;
}

export interface Records {
  [key: number]: Record;
}
