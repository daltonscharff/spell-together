import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LetterInputProvider } from "../contexts/LetterInputContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <LetterInputProvider>
      <Component {...pageProps} />
    </LetterInputProvider>
  );
}

export default App;
