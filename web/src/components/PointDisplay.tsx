import { useMemo } from "react";
import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { usePuzzle } from "../hooks/usePuzzle";

type Level = {
  rank: string;
  percent: number;
};

const levels = [
  {
    rank: "genius",
    percent: 70,
  },
  {
    rank: "amazing",
    percent: 50,
  },
  {
    rank: "great",
    percent: 40,
  },
  {
    rank: "nice",
    percent: 25,
  },
  {
    rank: "solid",
    percent: 15,
  },
  {
    rank: "good",
    percent: 8,
  },
  {
    rank: "moving up",
    percent: 5,
  },
  {
    rank: "good start",
    percent: 2,
  },
  {
    rank: "beginner",
    percent: 0,
  },
];

function findLevel(percent: number): Level {
  return levels.find((level) => level.percent <= percent) || levels[0];
}

export const PointDisplay = () => {
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
  const percent = (currentScore / maxScore) * 100;
  return (
    <div className="font-semibold">
      <span className="capitalize">{findLevel(percent).rank}: </span>
      <span>
        {currentScore}/{maxScore} points
      </span>
    </div>
  );
};
