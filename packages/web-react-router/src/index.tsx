import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./contexts/UserContext";
import "./index.css";
import { Router } from "./router";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
