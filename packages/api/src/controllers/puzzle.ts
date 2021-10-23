import { EntityController } from "@fastify-resty/core";
import { Puzzle } from "@daltonscharff/spelling-bee-core";

@EntityController(Puzzle, '/puzzles')
export default class PuzzleController {}