import { EntityController } from "@fastify-resty/core";
import { Puzzle } from "spelling-bee-core";

@EntityController(Puzzle, '/puzzles')
export default class PuzzleController {}