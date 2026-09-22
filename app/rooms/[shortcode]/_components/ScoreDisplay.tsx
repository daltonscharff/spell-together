type ScoreDisplayProps = {
  currentScore: number;
  maxScore: number;
};

const enum RANKS {
  BEGINNER = "beginner",
  GOOD_START = "good start",
  MOVING_UP = "moving up",
  GOOD = "good",
  SOLID = "solid",
  NICE = "nice",
  GREAT = "great",
  AMAZING = "amazing",
  GENIUS = "genius",
}

const LEVELS = [
  { rank: RANKS.BEGINNER, percentage: 0 },
  { rank: RANKS.GOOD_START, percentage: 2 },
  { rank: RANKS.MOVING_UP, percentage: 5 },
  { rank: RANKS.GOOD, percentage: 8 },
  { rank: RANKS.SOLID, percentage: 15 },
  { rank: RANKS.NICE, percentage: 25 },
  { rank: RANKS.GREAT, percentage: 40 },
  { rank: RANKS.AMAZING, percentage: 50 },
  { rank: RANKS.GENIUS, percentage: 70 },
];

function getLevelIndex(currentPercentage: number) {
  const index = LEVELS.findLastIndex(
    (level) => level.percentage <= currentPercentage,
  );

  if (index >= 0) return index;
  return LEVELS.length - 1;
}

export function ScoreDisplay({ currentScore, maxScore }: ScoreDisplayProps) {
  const currentPercentage = (currentScore / maxScore) * 100;
  const levelIndex = getLevelIndex(currentPercentage);
  const level = LEVELS[levelIndex];

  return (
    <div className="flex flex-row items-center">
      <span>{level.rank}</span>
      <div className="w-full">
        <hr className="w-full relative top-[15px] text-gray-200 z-[-1]" />
        <div className="flex flex-row flex-wrap-none justify-between items-center">
          {LEVELS.map((level, i) => {
            const bgColor = "bg-amber-300";
            if (i < levelIndex) {
              return (
                <div
                  key={level.rank}
                  className={`w-2.5 h-2.5 rounded-full ${bgColor}`}
                />
              );
            }
            if (i > levelIndex) {
              return (
                <div
                  key={level.rank}
                  className={`w-2.5 h-2.5 rounded-full bg-gray-200`}
                />
              );
            }
            return (
              <div
                key={level.rank}
                className={`flex justify-center items-center w-7.5 h-7.5 rounded-full text-xs ${bgColor}`}
              >
                {currentScore}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
