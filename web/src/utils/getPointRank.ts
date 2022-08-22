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

export function getPointRank(currentScore: number, maxScore: number) {
  const percent = (currentScore / maxScore) * 100;
  return (levels.find((level) => level.percent <= percent) || levels[0]).rank;
}
