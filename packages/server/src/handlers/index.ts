import type { Server, Socket } from "socket.io";
import userHandler from "./user.handler";

export default function (io: Server, socket: Socket) {
  socket.on("user:guess", userHandler.onGuess);
  socket.on("user:joinRoom", userHandler.onJoinRoom);
  socket.on("user:leaveRoom", userHandler.onLeaveRoom);
  socket.on("disconnect", () => {
    socket.rooms.forEach((room) => socket.leave(room));
  });
}
