import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import { Router } from "./router";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
