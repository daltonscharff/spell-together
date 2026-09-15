import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { DefaultLayout } from "./layouts/default";
import Home from "./pages/home";
import Room from "./pages/room";
import { Test } from "./pages/test";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="rooms">
            <Route path=":shortcode" element={<Room />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
