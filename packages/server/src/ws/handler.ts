import { Socket } from "socket.io";
import { BaseGuess } from "./interface";

export function wsHandler(socket: Socket) {
  socket.on("SubmitGuess", (data: BaseGuess) => {});
}

export default wsHandler;
