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
      <div className="flex flex-row justify-between border-b border-black font-light py-2">
        {puzzleId && <p>{puzzle?.date}</p>}

        <button
          onClick={unsetShortcode}
          className="flex flex-row items-center bg-zinc-50 border border-zinc-100 rounded-sm"
        >
          <img src="/icons/leave.svg" alt="Leave room" className="h-4 px-1" />
        </button>
      </div>
    </div>
  );
};
