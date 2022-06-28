import { usePuzzle } from "../hooks/usePuzzle";
import { useShortcode } from "../hooks/useShortcode";

type Props = {
  puzzleId?: string;
};

export const Header = ({ puzzleId }: Props) => {
  const { puzzle } = usePuzzle(puzzleId);
  const { unsetShortcode } = useShortcode();
  return (
    <div>
      <h1>Spell Together</h1>
      {puzzleId && <p>{puzzle?.date}</p>}
      <button onClick={unsetShortcode}>change room</button>
    </div>
  );
};
