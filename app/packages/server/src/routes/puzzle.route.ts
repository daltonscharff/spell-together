import express, { Request, Response } from "express";
import { puzzleService } from "../services";

export const puzzleRouter = express.Router();

puzzleRouter.get("/", async (req: Request, res: Response) => {
  try {
    const puzzles = await puzzleService.findAll();
    return res.send(puzzles);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

puzzleRouter.get("/newest", async (req: Request, res: Response) => {
  try {
    const puzzle = await puzzleService.findNewest();
    return res.send(puzzle);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default puzzleRouter;
