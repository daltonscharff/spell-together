import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/home";
import Room from "./pages/rooms/room";
import { CreateRoom } from "./pages/rooms/create";
import { JoinRoom } from "./pages/rooms/join";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms">
            <Route path=":shortcode" element={<Room />} />
            <Route path="create" element={<CreateRoom />} />
            <Route path="join" element={<JoinRoom />} />
          </Route>
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
