import type { Server, Socket } from "socket.io";
import guessHandler from "./guess.handler";

export default function (io: Server, socket: Socket) {
  socket.on("guess", guessHandler);
}
