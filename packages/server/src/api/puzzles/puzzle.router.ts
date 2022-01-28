import express, { Request, Response } from "express";
import * as PuzzleService from "./puzzle.service";

export const puzzleRouter = express.Router();

puzzleRouter.get("/", async (req: Request, res: Response) => {
  try {
    const puzzle = await PuzzleService.find();
    return res.send(puzzle);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default puzzleRouter;
