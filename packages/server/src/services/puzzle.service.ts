import * as models from "@daltonscharff/spelling-bee-core";
import { Puzzle } from "../interfaces";

export async function findAll(): Promise<Puzzle[]> {
  const puzzles = await models.Puzzle.query();
  return puzzles;
}

export async function findNewest(): Promise<Puzzle> {
  const puzzle = await models.Puzzle.query().orderBy("date", "desc").first();
  return puzzle;
}
