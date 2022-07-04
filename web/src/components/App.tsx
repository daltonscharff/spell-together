import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useGuesses } from "../hooks/useGuesses";
import { usePuzzle } from "../hooks/usePuzzle";
import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { CorrectGuessList } from "./CorrectGuessList";
import { DividedList } from "./DividedList";
import { FoundWordDisplay } from "./FoundWordDisplay";
import { Header } from "./Header";
import { Hive } from "./Hive";
import { LetterInput } from "./LetterInput";
import { LoginModal } from "./LoginModal";
import { PointDisplay } from "./PointDisplay";

export const App = () => {
  const { username } = useUsername();
  const { shortcode, isValid, loading: validatingShortcode } = useShortcode();
  const { room, isLoading: roomIsLoading } = useRoom(shortcode);
  const { isLoading: guessesAreLoading } = useGuesses(room?.id);
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
      <div className="container mx-auto grid gap-20 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-8 mx-auto md:mr-0 max-w-md min-w-[200px]">
          <LetterInput puzzleId={room?.puzzle_id} />
          <Hive puzzleId={room?.puzzle_id} />
        </div>
        <div className="flex flex-col mx-auto md:ml-0 max-w-lg min-w-[200px] border-black border-2 rounded-lg md:max-h-[600px]">
          <DividedList
            divider={<div className="border-b-2 border-black" />}
            overflowIndex={1}
          >
            <FoundWordDisplay roomId={room?.id} />
            <CorrectGuessList roomId={room?.id} />
            <PointDisplay puzzleId={room?.puzzle_id} roomId={room?.id} />
          </DividedList>
        </div>
      </div>
    </LetterInputProvider>
  );
};

export default App;
