import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { GameRoom } from "../pages/GameRoom";
import { LoginModal } from "./LoginModal";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid } = useShortcode();

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
      <GameRoom />
    </LetterInputProvider>
  );
};

export default App;
