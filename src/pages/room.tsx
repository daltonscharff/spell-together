import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecentRooms } from "../hooks/useRecentRooms";
import { useRoom } from "../hooks/useRoom";
import { usePuzzles } from "../hooks/usePuzzles";
import { PuzzleSelector } from "../components/PuzzleSelector";
import { type Puzzle } from "../types/database.types";
import GuessList from "../components/GuessList";

export function RoomPage() {
  const navigate = useNavigate();
  const { shortcode } = useParams();
  const { pushToRecentRooms } = useRecentRooms();

  const { puzzles } = usePuzzles();
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>();

  const { room, error: roomError, loading: roomLoading } = useRoom(shortcode);

  useEffect(() => {
    if (roomLoading) return;
    if (!shortcode || !room) {
      navigate("/", { replace: true });
      alert("Room not found");
      return;
    }
    if (shortcode && room.id) pushToRecentRooms(room.id, shortcode);
  }, [shortcode, room, roomLoading, roomError]);

  return (
    <>
      <div>Room page for shortcode: {shortcode}</div>
      <PuzzleSelector
        puzzles={puzzles}
        currentPuzzle={currentPuzzle}
        onPuzzleChange={(p: Puzzle) => setCurrentPuzzle(p)}
      />
      <div>
        <div>
          <span className="font-bold">puzzle:</span> {currentPuzzle?.date}{" "}
          {currentPuzzle?.outer_letters.join(",")},
          <span className="font-medium">{currentPuzzle?.center_letter}</span>
        </div>
        <GuessList roomId={room?.id} puzzleId={currentPuzzle?.id} />
      </div>
    </>
  );
}

export default RoomPage;
