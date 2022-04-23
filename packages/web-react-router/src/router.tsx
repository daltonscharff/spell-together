import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameRoom } from "./pages/GameRoom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<GameRoom />} />
        </Route>
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
