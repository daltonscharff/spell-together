import Card from "@mui/material/Card";
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
    rank: "beginner",
    percent: 0,
  },
  {
    rank: "good start",
    percent: 2,
  },
  {
    rank: "moving up",
    percent: 5,
  },
  {
    rank: "good",
    percent: 8,
  },
  {
    rank: "solid",
    percent: 15,
  },
  {
    rank: "nice",
    percent: 25,
  },
  {
    rank: "great",
    percent: 40,
  },
  {
    rank: "amazing",
    percent: 50,
  },
  {
    rank: "genius",
    percent: 70,
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
    <Card>
      <Typography>
        {findLevel(percent).rank}: {currentScore}/{maxScore}
      </Typography>
      <LinearProgress variant="determinate" value={percent} />
    </Card>
  );
};
