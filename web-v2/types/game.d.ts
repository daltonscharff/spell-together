import type { BaseType } from "./baseType";
import type { RoomId } from "./room";

export type GameId = string;

export type Game = BaseType & {
  puzzleId: PuzzleId;
  roomId: RoomId;
};
