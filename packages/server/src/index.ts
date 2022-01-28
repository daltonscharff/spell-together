import express from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import roomRouter from "./api/rooms/room.router";
import puzzleRouter from "./api/puzzles/puzzle.router";
import wsHandler from "./ws/handler";

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "localhost";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRouter);
app.use("/api/puzzles", puzzleRouter);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", wsHandler);

httpServer.listen(port, hostname, () => {
  console.log(`Listening at http://${hostname}:${port}`);
});
