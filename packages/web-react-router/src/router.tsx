import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<GamePage />} />
        </Route>
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
