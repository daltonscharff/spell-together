import {
  PrismaClient,
  Prisma,
  Word,
  Room,
  Record,
  Puzzle,
  RoomWord,
  PuzzleWord,
} from "@prisma/client";
import generateRoomCode from "./generateRoomCode";

export const prisma = new PrismaClient();

prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
  if (
    params.action === "create" &&
    params.model === "Room" &&
    params.args.data.code === null
  ) {
    let room = params.args.data;
    room.code = generateRoomCode(6);
  }
  return await next(params);
});

export { Word, Room, Record, Puzzle, RoomWord, PuzzleWord };
