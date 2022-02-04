import { useEffect } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";
export const socket = io(socketUrl);

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

export default useSocket;
