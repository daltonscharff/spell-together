import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Room } from "./pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/rooms/:shortcode" element={<Room />} />
          <Route path="*" element={<div>404: Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
