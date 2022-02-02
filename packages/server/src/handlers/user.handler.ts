import type { Socket } from "socket.io";
import emitError from "../helpers/emitError";
import { Guess, User, Record } from "../interfaces";
import { recordService, roomService } from "../services";

export async function onGuess(guess: Guess) {
  const socket: Socket = this;
  const shortcode = guess.shortcode;

  let record;
  try {
    record = await recordService.create(
      guess.word,
      guess.shortcode,
      guess.username
    );
  } catch (e) {
    return emitError(socket, "could not create record");
  }

  if (!record) return socket.emit("incorrectGuess", guess);
  socket.emit("correctGuess", guess);

  let foundWords: Record[];
  try {
    foundWords = await recordService.findAllInRoom(shortcode, "word");
  } catch (e) {
    return emitError(socket, "could not get found words");
  }
  socket.emit("updateFoundWords", foundWords);
  socket.to(shortcode).emit("updateFoundWords", foundWords);
}

export async function onJoinRoom({ shortcode }: User) {
  const socket: Socket = this;
  socket.join(shortcode);
  try {
    roomService.updateByShortcode(shortcode, {
      lastPlayed: new Date().toISOString(),
    });
  } catch (e) {
    return emitError(socket, "could not update room");
  }

  let foundWords: Record[];
  try {
    foundWords = await recordService.findAllInRoom(shortcode, "word");
  } catch (e) {
    return emitError(socket, "could not get found words");
  }
  socket.emit("updateFoundWords", foundWords);
}

export function onLeaveRoom({ shortcode }: User) {
  const socket: Socket = this;
  socket.leave(shortcode);
}

export default {
  onGuess,
  onJoinRoom,
  onLeaveRoom,
};
