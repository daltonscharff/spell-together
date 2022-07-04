import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useGuesses } from "../hooks/useGuesses";
import { usePuzzle } from "../hooks/usePuzzle";
import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { Header } from "./Header";
import { Hive } from "./Hive";
import { LetterInput } from "./LetterInput";
import { LoginModal } from "./LoginModal";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading: validatingShortcode } = useShortcode();
  const { room, isLoading: roomIsLoading } = useRoom(shortcode);
  const { correctGuesses, isLoading: guessesAreLoading } = useGuesses(room?.id);
  const { isLoading: puzzleIsLoading } = usePuzzle(room?.puzzle_id);

  if (
    validatingShortcode ||
    roomIsLoading ||
    puzzleIsLoading ||
    guessesAreLoading
  )
    return <div>Loading</div>;

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
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-8 mx-auto max-w-md min-w-[200px]">
          <LetterInput puzzleId={room?.puzzle_id} />
          <Hive puzzleId={room?.puzzle_id} />
        </div>
        <div>
          {JSON.stringify(room)}
          {JSON.stringify(correctGuesses)}
        </div>
      </div>
    </LetterInputProvider>
  );
};

export default App;
