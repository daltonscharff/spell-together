import {
  PrismaClient,
  Prisma,
  Word,
  Room,
  Record,
  Puzzle,
} from "@prisma/client";
import generateRoomCode from "./generateRoomCode";

export const prisma = new PrismaClient();

prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
  if (
    params.action === "create" &&
    params.model === "Room" &&
    params.args.data.code === null
  ) {
    const room = params.args.data;
    room.code = generateRoomCode(6);
  }

  // if (
  //   params.action === "create" &&
  //   params.model === "Word" &&
  //   params.args.data?.word
  // ) {
  //   let word = params.args.data.word;
  //   word = word.toLowerCase();
  // }

  return await next(params);
});

export { Word, Room, Record, Puzzle };
export * from "./types";
