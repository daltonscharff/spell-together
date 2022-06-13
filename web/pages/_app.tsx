import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { UserProvider } from "../contexts/UserContext";

function App({ Component, pageProps }: AppProps) {
  return (
    // <UserProvider>
    <Component {...pageProps} />
    // </UserProvider>
  );
}

export default App;
