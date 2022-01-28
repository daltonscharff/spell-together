import express, { Request, Response } from "express";
import * as RoomService from "./room.service";

export const roomRouter = express.Router();

roomRouter.get("/", async (req: Request, res: Response) => {
  try {
    const rooms = await RoomService.findAll();
    return res.send(rooms);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

roomRouter.get("/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  try {
    const room = await RoomService.find(code);
    if (room) return res.send(room);

    res.status(404).send("room not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

roomRouter.post("/", async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const room = await RoomService.create(name);
    res.status(201).send(room);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

roomRouter.delete("/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  try {
    await RoomService.remove(code);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default roomRouter;
