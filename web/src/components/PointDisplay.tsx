import { useMemo } from "react";
import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { usePuzzle } from "../hooks/usePuzzle";
import { getPointRank } from "../utils/getPointRank";
import { SortedNameList } from "./SortedNameList";

type Props = {
  expanded?: boolean;
};

export const PointDisplay = ({ expanded }: Props) => {
  const { correctGuesses } = useCorrectGuesses();
  const { puzzle } = usePuzzle();

  const maxScore = puzzle?.max_score || 0;

  const currentScore = useMemo(
    () =>
      correctGuesses?.reduce(
        (total, guess) => (total += guess.point_value || 0),
        0
      ) || 0,
    [correctGuesses]
  );
  return (
    <>
      <div className="font-semibold">
        <span className="capitalize">
          {getPointRank(currentScore, maxScore)}:{" "}
        </span>
        <span>
          {currentScore}/{maxScore} points
        </span>
      </div>
      {expanded && <SortedNameList sortBy="points" />}
    </>
  );
};
