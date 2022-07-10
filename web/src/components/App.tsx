import { LetterInputProvider } from "../contexts/LetterInputContext";
import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { usePuzzle } from "../hooks/usePuzzle";
import { useRoom } from "../hooks/useRoom";
import { useShortcode } from "../hooks/useShortcode";
import { useUsername } from "../hooks/useUsername";
import { ButtonArea } from "./ButtonArea";
import { CorrectGuessList } from "./CorrectGuessList";
import { Footer } from "./Footer";
import { FoundWordDisplay } from "./FoundWordDisplay";
import { Header } from "./Header";
import { Hive } from "./Hive";
import { LetterInput } from "./LetterInput";
import { LoginModal } from "./LoginModal";
import { PointDisplay } from "./PointDisplay";

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
      <div className="flex flex-col gap-y-8 min-h-screen">
        <Header />
        <div className="container grid gap-8 grid-cols-1 md:grid-cols-2 flex-grow">
          <div className="flex flex-col gap-8 mx-auto max-w-sm min-w-[200px]">
            <LetterInput />
            <Hive />
            <ButtonArea />
          </div>
          <div className="flex flex-col mx-auto max-w-lg min-w-[200px] border-black border rounded-sm md:max-h-[600px]">
            <div className="p-4 border-b-2 border-black">
              <PointDisplay />
            </div>
            <div className="p-4 border-b-2 border-black">
              <FoundWordDisplay />
            </div>
            <div className="p-2 overflow-y-auto">
              <CorrectGuessList />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LetterInputProvider>
  );
};

export default App;
