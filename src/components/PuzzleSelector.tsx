import { useEffect } from "react";
import type { Puzzle } from "../types/database.types";

export function PuzzleSelector({
  puzzles = [],
  currentPuzzle,
  onPuzzleChange,
}: {
  puzzles: Puzzle[] | undefined;
  currentPuzzle: Puzzle | undefined;
  onPuzzleChange: (p: Puzzle) => void;
}) {
  const onItemSelection = (p: Puzzle) => {
    (document.activeElement as HTMLAnchorElement).blur();
    onPuzzleChange(p);
  };

  useEffect(() => {
    if (currentPuzzle === undefined) {
      onPuzzleChange(puzzles[0]);
    }
  }, [puzzles, currentPuzzle]);

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {currentPuzzle?.date}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {puzzles?.map((puzzle) => (
          <li key={`puzzle_item_${puzzle.id}`}>
            <a onClick={onItemSelection.bind(undefined, puzzle)}>
              {puzzle.date}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
