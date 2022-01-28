import { prisma } from "@daltonscharff/spelling-bee-core";
import { Room, Rooms } from "./room.interface";

export async function findAll(): Promise<Rooms> {
  return await prisma.room.findMany();
}

export async function find(code: string): Promise<Room> {
  return await prisma.room.findFirst({
    where: {
      code,
    },
  });
}

export async function create(name: string): Promise<Room> {
  return await prisma.room.create({
    data: {
      code: generateRoomCode(6),
      name,
    },
  });
}

export async function remove(code: string): Promise<Room> {
  return await prisma.room.delete({
    where: {
      code,
    },
  });
}

function generateRoomCode(length: number) {
  const validLetters = "ACDEFGHJLMNPQRSTUVWXYZ02345679";
  let roomCode = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * validLetters.length);
    roomCode += validLetters.charAt(random);
  }
  return roomCode;
}
