import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { Header } from "./Header";
import { LoginModal } from "./LoginModal";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading } = useShortcode();
  const { room } = useRoom("abcdef");

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
      <h1 className="text-3xl font-bold underline">show game</h1>
      {JSON.stringify(room)}
    </>
  );
};

export default App;
