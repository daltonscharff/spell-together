import * as models from "@daltonscharff/spelling-bee-core";
import { Puzzle } from "../interfaces";

export async function find(): Promise<Puzzle> {
  const puzzle = await models.Puzzle.query().first();
  return puzzle;
}
