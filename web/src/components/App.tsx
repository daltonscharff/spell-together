import { useGuesses } from "../hooks/useGuesses";
import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { Header } from "./Header";
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
    <>
      <Header puzzleId={room?.puzzle_id} />
      {JSON.stringify(room)}
      {JSON.stringify(correctGuesses)}
    </>
  );
};

export default App;
