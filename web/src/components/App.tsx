import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useGuesses } from "../hooks/useGuesses";
import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { Header } from "./Header";
import { Hive } from "./Hive";
import { LoginModal } from "./LoginModal";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading } = useShortcode();
  const { room } = useRoom(shortcode);
  const { correctGuesses } = useGuesses(room?.id);

  if (loading) return <div></div>;

  if (!username || !shortcode || !isValid) {
    return (
      <div>
        <LoginModal />
        <p>show sign in page</p>
        <p>show disabled game</p>
      </div>
    );
  }

  return (
    <LetterInputProvider>
      <Header puzzleId={room?.puzzle_id} />
      <div className="flex flex-col md:flex-row">
        <Hive puzzleId={room?.puzzle_id} />
      </div>
      {JSON.stringify(room)}
      {JSON.stringify(correctGuesses)}
    </LetterInputProvider>
  );
};

export default App;
