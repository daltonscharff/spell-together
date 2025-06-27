import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecentRooms } from "../hooks/useRecentRooms";
import { useRoom } from "../hooks/useRoom";
import { useWords } from "../hooks/useWords";
import { usePuzzles } from "../hooks/usePuzzles";
import { useGuesses } from "../hooks/useGuesses";
import { PuzzleSelector } from "../components/PuzzleSelector";
import { type Puzzle } from "../types/database.types";

export function RoomPage() {
  const navigate = useNavigate();
  const { shortcode } = useParams();
  const { pushToRecentRooms } = useRecentRooms();

  const { puzzles } = usePuzzles();
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>();

  const { room, error: roomError, loading: roomLoading } = useRoom(shortcode);

  const { words, wordsMappedById } = useWords(currentPuzzle?.id);

  const { guesses, revalidate: revalidateGuesses } = useGuesses(
    room?.id,
    currentPuzzle?.id
  );

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
        <div className="wrap-normal">
          <span className="font-bold">words:</span>{" "}
          {words?.map((word) => word.word).join(", ")}
        </div>
        <div>
          <span className="font-bold">guesses:</span>{" "}
          {guesses
            ?.map((guess) => wordsMappedById.get(guess.word_id)?.word)
            .filter(Boolean)
            .join(", ")}
        </div>
      </div>
      <button className="btn" onClick={revalidateGuesses}>
        Reload guesses
      </button>
    </>
  );
}

export default RoomPage;
