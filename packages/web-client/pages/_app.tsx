import "../styles/globals.css";
import type { AppProps } from "next/app";
import SocketProvider from "../providers/SocketProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default App;
