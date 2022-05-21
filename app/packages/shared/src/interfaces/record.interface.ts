import Room from "./room.interface";
import Word from "./word.interface";

export default interface Record {
  id: string;
  createdAt: string;
  username: string;
  roomId: string;
  wordId: string;
  room?: Room;
  word?: Word;
}
