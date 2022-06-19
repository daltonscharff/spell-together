import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

export type PointDisplayProps = {
  currentScore?: number;
  maxScore?: number;
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

export const PointDisplay = ({
  currentScore = 0,
  maxScore = 0,
}: PointDisplayProps) => {
  const percent = (currentScore / maxScore) * 100;
  return (
    <>
      <Typography>
        {findLevel(percent).rank}: {currentScore}/{maxScore}
      </Typography>
      <LinearProgress variant="determinate" value={percent} />
    </>
  );
};
