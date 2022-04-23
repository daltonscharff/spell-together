import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameRoom } from "./pages/GameRoom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<GameRoom showSelectRoomModal />} />
        </Route>
        <Route path="/rooms" element={<GameRoom showSelectRoomModal />} />
        <Route path="/rooms/:shortcode" element={<GameRoom />} />
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
