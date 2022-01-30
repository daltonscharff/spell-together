import express, { Request, Response } from "express";
import * as RecordService from "./record.service";

export const recordRouter = express.Router();

recordRouter.get("/:shortcode", async (req: Request, res: Response) => {
  const shortcode = req.params.shortcode;
  try {
    const records = await RecordService.findAllInRoom(shortcode);
    res.send(records);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default recordRouter;
