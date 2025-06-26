import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecentRooms } from "../hooks/useRecentRooms";
import { useRoom } from "../hooks/useRoom";
import { useWords } from "../hooks/useWords";
import { usePuzzles } from "../hooks/usePuzzles";
import { useGuesses } from "../hooks/useGuesses";

export function RoomPage() {
  const navigate = useNavigate();
  const { shortcode } = useParams();
  const { pushToRecentRooms } = useRecentRooms();

  const { puzzles } = usePuzzles();
  const { room, error: roomError, loading: roomLoading } = useRoom(shortcode);

  const currentPuzzle = puzzles?.[0];
  const { wordsMappedById } = useWords(currentPuzzle?.id);
  console.log({ wordsMappedById });

  const { guesses } = useGuesses(room?.id, currentPuzzle?.id);
  console.log({ guesses });

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
