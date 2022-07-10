import { usePuzzle } from "../hooks/usePuzzle";
import { useShortcode } from "../hooks/useShortcode";

type Props = {
  puzzleId?: string;
};

export const Header = ({ puzzleId }: Props) => {
  const { puzzle } = usePuzzle(puzzleId);
  const { shortcode, unsetShortcode } = useShortcode();
  return (
    <div className="container mt-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-baseline gap-x-4 gap-x mb-2">
        <h1 className="font-display text-2xl text-left col-span-2 sm:col-span-1">
          Spell Together
        </h1>
        {puzzle?.date && (
          <div className="font-light text-left sm:text-center">
            {new Date(puzzle.date).toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </div>
        )}
        <div
          onClick={unsetShortcode}
          className="cursor-pointer uppercase font-semibold text-right ml-2"
        >
          {shortcode}
          <img
            src="/icons/leave.svg"
            alt="Leave room"
            className="h-3 pl-1 relative bottom-[2px] inline-block"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between border-b border-black font-light"></div>
    </div>
  );
};
