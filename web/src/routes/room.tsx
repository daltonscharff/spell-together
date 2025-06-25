import { useEffect } from "react";
import { useParams } from "react-router";
import { useRecentRooms } from "../hooks/useRecentRooms";

export function RoomPage() {
  const { shortcode } = useParams();
  const { pushToRecentRooms } = useRecentRooms();

  useEffect(() => {
    if (shortcode) pushToRecentRooms(shortcode);
  }, []);

  return (
    <>
      <div>Room page for shortcode: {shortcode}</div>
    </>
  );
}

export default RoomPage;
