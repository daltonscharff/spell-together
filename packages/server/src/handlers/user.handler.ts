import type { Socket } from "socket.io";
import { Guess, User } from "../interfaces";
import { recordService } from "../services";

export function onGuess(guess: Guess) {
  const socket: Socket = this;
  const shortcode = guess.shortcode;
  const record = recordService.create(
    guess.word,
    guess.shortcode,
    guess.username
  );
  if (record) {
    socket.emit("correctGuess", guess);
    socket
      .to(shortcode)
      .emit("updateFoundWords", recordService.findAllInRoom(shortcode, "word"));
  } else {
    socket.emit("incorrectGuess", guess);
  }
}

export function onJoinRoom(user: User) {
  const socket: Socket = this;
  const shortcode = user.shortcode;
  socket.join(shortcode);
  socket.emit(
    "updateFoundWords",
    recordService.findAllInRoom(shortcode, "word")
  );
  // socket.broadcast.to(shortcode).emit("room:userJoined", user.username);
}

export function onLeaveRoom(user: User) {
  const socket: Socket = this;
  const shortcode = user.shortcode;
  socket.leave(shortcode);
}

export default {
  onGuess,
  onJoinRoom,
  onLeaveRoom,
};
