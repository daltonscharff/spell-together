import { createContext } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";
export const socket = io(socketUrl);

const isBrowser = typeof window !== "undefined";
if (!isBrowser) {
  socket.close();
}

export const SocketContext = createContext(socket);

export default SocketContext;
