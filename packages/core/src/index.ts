import { PrismaClient, Word, Room, Record, Puzzle } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

export { Word, Room, Record, Puzzle };
export * from "./types";
