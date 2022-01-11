import { FC } from "react";

type Props = {
  currentScore: number;
  maxScore: number;
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

function findLevelIndex(currentScore: number, maxScore: number): number {
  const currentPercent = (currentScore / maxScore) * 100;
  const index = levels.findIndex((level) => level.percent > currentPercent);

  if (index === -1) return levels.length - 1;
  return index - 1;
}

const FoundWords: FC<Props> = ({ currentScore, maxScore }) => {
  const levelIndex = findLevelIndex(currentScore, maxScore);
  console.log({ levelIndex });
  const rank = levels[levelIndex].rank;
  return (
    <div className="flex items-center">
      <span className="capitalize font-black w-20 mr-2">{rank}</span>
      <span className="flex justify-between items-center w-full">
        {levels.map((_, i) => (
          <>
            <span
              key={i}
              className={`text-center align-middle ${
                i === levelIndex ? "w-8 h-8 leading-8" : "w-3 h-3"
              } ${i < levels.length - 1 ? "rounded-full" : "rounded-none"} ${
                i <= levelIndex ? "bg-amber-200" : "bg-gray-200"
              }`}
            >
              {i === levelIndex ? currentScore : ""}
            </span>
            {i !== levels.length - 1 ? (
              <span className="border flex-grow" />
            ) : (
              ""
            )}
          </>
        ))}
      </span>
    </div>
  );
};

export default FoundWords;
