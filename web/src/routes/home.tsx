import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
      <div>
        <h1>Recent rooms</h1>
        {recentRooms.length > 0 ? (
          recentRooms.map((recentRoom, i) => (
            <Link
              to={`/rooms/${recentRoom.shortcode}`}
              key={`${recentRoom.roomId}_${i}`}
            >
              <button className="btn">
                <div>{recentRoom.shortcode}</div>
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
