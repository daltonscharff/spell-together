import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { io } from "socket.io-client";
import SocketContext from "../providers/socketContext";

function App({ Component, pageProps }: AppProps) {
  const socket = useMemo(() => io("http://localhost:4000"), [io]);
  return (
    <SocketContext.Provider value={socket}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}

export default App;
