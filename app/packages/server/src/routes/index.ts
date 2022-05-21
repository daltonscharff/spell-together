import { Router } from "express";
import puzzleRouter from "./puzzle.route";
import recordRouter from "./record.route";
import roomRouter from "./room.route";

const router: Router = Router();
router.use("/api/rooms", roomRouter);
router.use("/api/puzzles", puzzleRouter);
router.use("/api/records", recordRouter);

export { router as default, puzzleRouter, recordRouter, roomRouter };
