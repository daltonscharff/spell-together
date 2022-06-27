import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { UsernameProvider } from "./contexts/UsernameContext";
import { ShortcodeProvider } from "./contexts/ShortcodeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UsernameProvider>
      <ShortcodeProvider>
        <App />
      </ShortcodeProvider>
    </UsernameProvider>
  </React.StrictMode>
);
