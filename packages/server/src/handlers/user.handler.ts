import type { Socket } from "socket.io";
import { Guess, User } from "../interfaces";

export function onGuess(guess: Guess) {
  const socket: Socket = this;
  console.log("hello from onGuess");
  socket.emit("abc", "from onGuess");
}

export function onJoinRoom(user: User) {
  const socket: Socket = this;
  const shortcode = user.shortcode.toLowerCase();
  socket.join(shortcode);
  console.log("joining room:", shortcode);
  // socket.broadcast.to(shortcode).emit("room:userJoined", user.username);
}

export function onLeaveRoom(user: User) {
  const socket: Socket = this;
  const shortcode = user.shortcode.toLowerCase();
  socket.leave(shortcode);
}

export default {
  onGuess,
  onJoinRoom,
  onLeaveRoom,
};
