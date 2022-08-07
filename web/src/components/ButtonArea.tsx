import { useLetterInput } from "../hooks/useLetterInput";
import { usePuzzle } from "../hooks/usePuzzle";
import { useSubmitGuess } from "../hooks/useSubmitGuess";

export const ButtonArea = () => {
  const { removeLetter } = useLetterInput();
  const { submitGuess } = useSubmitGuess();
  const { shuffleLetters } = usePuzzle();

  return (
    <div className="grid grid-cols-3 gap-2">
      <div
        className="uppercase justify-self-center self-center p-2 cursor-pointer"
        onClick={removeLetter}
      >
        Delete
      </div>
      <div
        onClick={shuffleLetters}
        className="py-1 px-4 justify-self-center self-center p-2 cursor-pointer"
      >
        <img alt="shuffle" src="/icons/shuffle.svg" className="h-8" />
      </div>
      <div
        onClick={() => {
          submitGuess();
        }}
        className="uppercase justify-self-center self-center p-2 cursor-pointer"
      >
        Enter
      </div>
    </div>
  );
};
