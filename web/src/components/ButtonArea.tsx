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
      <button onClick={shuffle}>Shuffle</button>
      <button className="uppercase">Enter</button>
    </div>
  );
};
