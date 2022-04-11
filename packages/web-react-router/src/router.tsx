import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateRoom } from "./components/CreateRoom";
import { JoinRoom } from "./components/JoinRoom";
import { RoomSelection } from "./layouts/RoomSelection";
import { Home, Room } from "./pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="/rooms/">
          <Route
            path="/rooms/join"
            element={
              <RoomSelection>
                <JoinRoom />
              </RoomSelection>
            }
          />
          <Route
            path="/rooms/create"
            element={
              <RoomSelection selectedIndex={1}>
                <CreateRoom />
              </RoomSelection>
            }
          />
          <Route path="/rooms/:shortcode" element={<Room />} />
        </Route>
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
