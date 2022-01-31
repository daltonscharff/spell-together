import type { Server, Socket } from "socket.io";

export default function (io: Server) {
  console.log("hello from guess.handler");
  const socket: Socket = this;
  socket.emit("Guess received", "abc");
}
