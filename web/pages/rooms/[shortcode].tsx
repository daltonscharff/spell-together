import { useRouter } from "next/router";
import { useGuesses } from "../../hooks/useGuesses";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";
import { GameBoard } from "../../components/GameBoard";

export default function Room() {
  const router = useRouter();
  const shortcode = router.query.shortcode?.toString() || "";

  const { room, loading: loadingRoom } = useRoom(shortcode);
  const { puzzle, loading: loadingPuzzle } = usePuzzle(room?.puzzle_id || "");
  const {
    correctGuesses,
    submitGuess,
    loading: loadingGuesses,
  } = useGuesses(room?.id || "");

  if (loadingRoom || loadingPuzzle || loadingGuesses) return <div>Loading</div>;

  if (!room) {
    if (shortcode) return <div>Room does not exist</div>;
    return <div></div>;
  }

  return (
    <GameBoard
      puzzle={puzzle}
      room={room}
      correctGuesses={correctGuesses}
      onSubmit={submitGuess}
    />
  );
}
