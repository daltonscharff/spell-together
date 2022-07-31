import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameRoom } from "../pages/GameRoom";
import { Index } from "../pages/Index";
import { Layout } from "./Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="rooms/:shortcode" element={<GameRoom />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
