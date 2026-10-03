import { usePuzzles } from "../_hooks/usePuzzles";
import { useSelectedPuzzleIdContext } from "../_contexts/selectedPuzzleIdContext";
import { useEffect } from "react";

export function PuzzleSelector() {
  const { puzzles } = usePuzzles();
  const { selectedPuzzleId, setSelectedPuzzleId } =
    useSelectedPuzzleIdContext();

  useEffect(() => {
    if (puzzles && puzzles.length > 0 && !selectedPuzzleId) {
      setSelectedPuzzleId(puzzles[0].id);
    }
  }, [puzzles, selectedPuzzleId, setSelectedPuzzleId]);

  return (
    <select
      value={selectedPuzzleId ?? undefined}
      onChange={(e) =>
        setSelectedPuzzleId(e.target.value ? parseInt(e.target.value) : null)
      }
    >
      {puzzles?.map((puzzle) => (
        <option key={puzzle.id} value={puzzle.id}>
          {puzzle.dateDisplay}
        </option>
      ))}
    </select>
  );
}
