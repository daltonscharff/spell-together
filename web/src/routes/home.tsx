import { useState } from "react";
import { useNavigate } from "react-router";
import { APP_NAME } from "../copy";
import { useRecentRooms } from "../hooks/useRecentRooms";

export function HomePage() {
  const navigate = useNavigate();
  const { recentRooms } = useRecentRooms();
  const [roomCodeInputValue, setRoomCodeInputValue] = useState("");

  return (
    <>
      <h1>{APP_NAME}</h1>
      <div>
        <h2>Recent rooms</h2>
        {recentRooms.length > 0 ? (
          recentRooms.map((room) => <div>{room}</div>)
        ) : (
          <div>No recent rooms</div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: check if room exists before rerouting
          navigate(`/rooms/${roomCodeInputValue}`);
        }}
      >
        <input
          className="input"
          placeholder="room code"
          value={roomCodeInputValue}
          onChange={(e) => setRoomCodeInputValue(e.target.value)}
        />
        <button className="btn">Join a room</button>
      </form>
    </>
  );
}

export default HomePage;
