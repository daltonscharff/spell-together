import { Socket } from "socket.io";

export default function emitError(socket: Socket, message?: string) {
  socket.emit("error", {
    message: message || "unknown error",
  });
}
