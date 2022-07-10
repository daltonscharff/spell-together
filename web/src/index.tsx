import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { UsernameProvider } from "./contexts/UsernameContext";
import { ShortcodeProvider } from "./contexts/ShortcodeContext";
import { ShuffledLettersProvider } from "./contexts/ShuffledLettersContext";
import { PuzzleIdProvider } from "./contexts/PuzzleIdContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UsernameProvider>
      <ShortcodeProvider>
        <PuzzleIdProvider>
          <ShuffledLettersProvider>
            <App />
          </ShuffledLettersProvider>
        </PuzzleIdProvider>
      </ShortcodeProvider>
    </UsernameProvider>
  </React.StrictMode>
);
