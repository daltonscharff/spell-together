import React from "react";
import ReactDOM from "react-dom";
import { PuzzleProvider } from "./contexts/PuzzleContext";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import { Router } from "./router";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PuzzleProvider>
        <Router />
      </PuzzleProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
