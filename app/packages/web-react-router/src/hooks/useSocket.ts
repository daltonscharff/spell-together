import { useEffect } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.REACT_APP_SERVER_URL;
export const socket = io(socketUrl!);

socket.on("error", (error) => console.log(error));

const isBrowser = typeof window !== "undefined";
if (!isBrowser) {
  socket.close();
}

export function useSocket(eventName: string, cb: (...args: any[]) => void) {
  useEffect(() => {
    socket.on(eventName, cb);
    return () => {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
