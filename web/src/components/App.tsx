import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { GameRoom } from "../pages/GameRoom";
import { Index } from "../pages/Index";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid } = useShortcode();

  if (!username || !shortcode || !isValid) {
    return <Index />;
  }

  return (
    <LetterInputProvider>
      <GameRoom />
    </LetterInputProvider>
  );
};

export default App;
