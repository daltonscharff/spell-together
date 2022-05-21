import React from "react";
import ReactDOM from "react-dom";
import { PuzzleProvider } from "./contexts/PuzzleContext";
import { RoomProvider } from "./contexts/RoomContext";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import { Router } from "./router";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <PuzzleProvider>
        <RoomProvider>
          <Router />
        </RoomProvider>
      </PuzzleProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
