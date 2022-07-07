import { usePuzzle } from "../hooks/usePuzzle";
import { useShortcode } from "../hooks/useShortcode";

type Props = {
  puzzleId?: string;
};

export const Header = ({ puzzleId }: Props) => {
  const { puzzle } = usePuzzle(puzzleId);
  const { unsetShortcode } = useShortcode();
  return (
    <div className="container mt-2">
      <h1 className="font-display text-center md:text-left text-4xl md:text-5xl">
        Spell Together
      </h1>
      <div className="flex flex-row justify-between border-b font-light py-1">
        {puzzleId && <p>{puzzle?.date}</p>}
        <button onClick={unsetShortcode}>Leave</button>
      </div>
    </div>
  );
};
