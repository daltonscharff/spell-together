import { useLetterInput } from "../hooks/useLetterInput";
import { useSubmitGuess } from "../hooks/useSubmitGuess";

type Props = {
  shuffle: () => void;
};

export const ButtonArea = ({ shuffle }: Props) => {
  const { removeLetter } = useLetterInput();
  const { submitGuess } = useSubmitGuess();
  return (
    <div className="grid grid-cols-3 gap-2">
      <button className="uppercase" onClick={removeLetter}>
        Delete
      </button>
      <div className="text-center">
        <button onClick={shuffle} className="py-1 px-4">
          <img alt="shuffle" src="/icons/shuffle.svg" className="h-8" />
        </button>
      </div>
      <button
        onClick={() => {
          submitGuess();
        }}
        className="uppercase"
      >
        Enter
      </button>
    </div>
  );
};
