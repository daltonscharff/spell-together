import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { APP_NAME } from "../copy";
import { useRecentRooms } from "../hooks/useRecentRooms";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

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
          recentRooms.map((recentRoom) => (
            <Link to={`/rooms/${recentRoom.shortcode}`}>
              <button className="btn">
                <div key={recentRoom.roomId}>{recentRoom.shortcode}</div>
                <div>
                  last visited:{" "}
                  {dayjs
                    .duration(
                      dayjs(recentRoom.lastVisitedAt).diff(dayjs()),
                      "millisecond"
                    )
                    .humanize(true)}
                </div>
              </button>
            </Link>
          ))
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
