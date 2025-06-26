import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecentRooms } from "../hooks/useRecentRooms";
import { useRoom } from "../hooks/useRoom";

export function RoomPage() {
  const { shortcode } = useParams();
  const { pushToRecentRooms } = useRecentRooms();
  const {
    room,
    error: roomError,
    loading: roomLoading,
  } = useRoom(shortcode ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    if (roomLoading) return;
    if (!shortcode || !room) {
      navigate("/");
      alert("Room not found");
      return;
    }
    if (shortcode && room.id) pushToRecentRooms(room.id, shortcode);
  }, [shortcode, room, roomLoading, roomError]);

  return (
    <>
      <div>Room page for shortcode: {shortcode}</div>
    </>
  );
}

export default RoomPage;
