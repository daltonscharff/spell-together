import { atom } from "recoil";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "");

export const roomState = atom({
  key: "room",
  default: "",
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue, oldValue, isReset) => {
        if (isReset) {
          socket.emit("room:leave", { room: oldValue });
        } else {
          socket.emit("room:join", { room: newValue });
        }
      });
    },
  ],
});

export const lettersState = atom({
  key: "letters",
  default: [""],
});

export const centerLetterState = atom({
  key: "centerLetter",
  default: "",
});
