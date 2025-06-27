import type { Puzzle } from "../types/database.types";

export function PuzzleSelector({
  puzzles,
  currentPuzzleIndex,
  setCurrentPuzzleIndex,
}: {
  puzzles: Puzzle[];
  currentPuzzleIndex: number;
  setCurrentPuzzleIndex: (index: number) => void;
}) {
  const onItemSelection = (index: number) => {
    (document.activeElement as HTMLAnchorElement).blur();
    setCurrentPuzzleIndex(index);
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {puzzles[currentPuzzleIndex]?.date}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {puzzles?.map((puzzle, i) => (
          <li key={`puzzle_item_${puzzle.id}`}>
            <a onClick={onItemSelection.bind(undefined, i)}>{puzzle.date}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
