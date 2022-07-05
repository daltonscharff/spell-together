import { useLetterInput } from "../hooks/useLetterInput";

type Props = {
  puzzleId?: string;
};

export const ButtonArea = ({ puzzleId }: Props) => {
  const { removeLetter } = useLetterInput();
  return (
    <div className="grid grid-cols-3 gap-2">
      <button className="uppercase" onClick={removeLetter}>
        Delete
      </button>
      <button>Shuffle</button>
      <button className="uppercase">Enter</button>
    </div>
  );
};
