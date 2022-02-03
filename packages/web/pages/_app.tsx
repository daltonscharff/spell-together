import "../styles/globals.css";
import "../styles/loader.css";
import "boxicons/css/boxicons.min.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
