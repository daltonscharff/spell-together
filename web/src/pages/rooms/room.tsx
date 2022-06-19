import { useNavigate, useParams } from "react-router-dom";
import { useGuesses } from "../../hooks/useGuesses";
import { usePuzzle } from "../../hooks/usePuzzle";
import { useRoom } from "../../hooks/useRoom";
import { GameBoard } from "../../components/GameBoard";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

export default function Room() {
  const params = useParams();
  const shortcode = params.shortcode ?? "";
  const navigate = useNavigate();
  const { room, loading: loadingRoom } = useRoom(shortcode);
  const { puzzle, loading: loadingPuzzle } = usePuzzle(room?.puzzle_id || "");
  const {
    correctGuesses,
    submitGuess,
    loading: loadingGuesses,
  } = useGuesses(room?.id || "");

  const { username, setShortcode, validateShortcode } = useUser();

  useEffect(() => {
    (async () => {
      const isValid = await validateShortcode(shortcode);
      if (isValid) {
        setShortcode(shortcode);
      } else {
        setShortcode("");
        navigate("/rooms/join", { replace: true });
      }
    })();
  }, [shortcode, validateShortcode, setShortcode, navigate]);

  useEffect(() => {
    if (!username) {
      navigate("/rooms/join");
    }
  }, [username, navigate]);

  if (loadingRoom || loadingPuzzle || loadingGuesses) return <div>Loading</div>;

  return (
    <GameBoard
      puzzle={puzzle}
      room={room}
      correctGuesses={correctGuesses}
      onSubmit={submitGuess}
    />
  );
}
