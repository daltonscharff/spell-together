import { usePuzzle } from "../hooks/usePuzzle";
import { useLocalStore } from "../hooks/useLocalStore";

type Props = {
  titleOnly?: boolean;
};

export const Header = ({ titleOnly }: Props) => {
  const { puzzle, setPuzzleId } = usePuzzle();
  const shortcode = useLocalStore((state) => state.shortcode);
  return (
    <div className="container mt-3 border-b border-black pb-2 sm:pb-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-baseline gap-x-4 gap-x mb-2">
        <h1 className="font-display text-2xl text-left col-span-2 sm:col-span-1">
          Spell Together
        </h1>
        {!titleOnly && (
          <>
            {puzzle?.date && (
              <div className="font-light text-left sm:text-center">
                {new Date(puzzle.date).toLocaleDateString(undefined, {
                  dateStyle: "full",
                })}
              </div>
            )}
            {shortcode && (
              <div
                onClick={() => {
                  setPuzzleId(null);
                }}
                className="cursor-pointer uppercase font-semibold text-right ml-2"
              >
                {shortcode}
                <img
                  src="/icons/leave.svg"
                  alt="Leave room"
                  className="h-3 pl-1 relative bottom-[2px] inline-block"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
