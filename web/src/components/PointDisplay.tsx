import { useMemo } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useGuesses } from "../hooks/useGuesses";
import { usePuzzle } from "../hooks/usePuzzle";

export type PointDisplayProps = {
  roomId?: string;
  puzzleId?: string;
};

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

export const PointDisplay = ({ roomId, puzzleId }: PointDisplayProps) => {
  const { correctGuesses } = useGuesses(roomId);
  const { puzzle } = usePuzzle(puzzleId);
  const currentScore = useMemo(
    () =>
      correctGuesses?.reduce(
        (total, guess) => (total += guess.point_value || 0),
        0
      ) || 0,
    [correctGuesses]
  );
  const maxScore = puzzle?.max_score || 0;
  const percent = (currentScore / maxScore) * 100;
  return (
    <div>
      <span className="capitalize">{findLevel(percent).rank}: </span>
      <span>
        {currentScore}/{maxScore} points
      </span>
    </div>
  );
};
