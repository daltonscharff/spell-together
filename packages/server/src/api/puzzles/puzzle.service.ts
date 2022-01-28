import { prisma } from "@daltonscharff/spelling-bee-core";
import { Puzzle } from "./puzzle.interface";

export async function find(date?: string): Promise<Puzzle> {
  const puzzle = await prisma.puzzle.findFirst();

  return { ...puzzle, date: puzzle.createdAt.toISOString() };
}
