import type { BaseType } from "./baseType";
import type { RoomId } from "./room";
import type { UserId } from "./user";
import type { WordId } from "./word";

export type GuessId = string;

export type Guess = BaseType & {
  userId: UserId;
  roomId: RoomId;
  wordId: WordId;
  isCorrect: boolean;
};
