import { Router } from "express";
import puzzleRouter from "./puzzle.router";
import recordRouter from "./record.router";
import roomRouter from "./room.router";

const router: Router = Router();
router.use("/api/rooms", roomRouter);
router.use("/api/puzzles", puzzleRouter);
router.use("/api/records", recordRouter);

export { router as default, puzzleRouter, recordRouter, roomRouter };
