import { useLetterInput } from "../hooks/useLetterInput";
import { usePuzzle } from "../hooks/usePuzzle";

type Props = {
  puzzleId?: string;
};

export const ButtonArea = ({ puzzleId }: Props) => {
  const { removeLetter } = useLetterInput();
  const { shuffle } = usePuzzle(puzzleId);
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
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Enter" })
          );
        }}
        className="uppercase"
      >
        Enter
      </button>
    </div>
  );
};
