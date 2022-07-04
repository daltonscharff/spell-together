import { useGuesses } from "../hooks/useGuesses";
import { useMemo } from "react";

type Props = {
  roomId?: string;
};

export const FoundWordDisplay = ({ roomId }: Props) => {
  const { correctGuesses } = useGuesses(roomId);
  const correctPerPlayer = useMemo(() => {
    const count: Record<string, number> = {};
    correctGuesses?.forEach((guess) => {
      count[guess.username!]
        ? (count[guess.username!] += 1)
        : (count[guess.username!] = 1);
    });
    return count;
  }, [correctGuesses]);
  const playersSortedByCorrectGuesses = useMemo(() => {
    return Object.keys(correctPerPlayer).sort((a, b) => {
      const countA = correctPerPlayer[a];
      const countB = correctPerPlayer[b];
      if (countA === countB) return a.localeCompare(b);
      return countB - countA;
    });
  }, [correctPerPlayer]);

  return (
    <div>
      <div className="font-bold">
        Found Words: {correctGuesses?.length || 0}
      </div>
      <div>
        {playersSortedByCorrectGuesses.map((player, i) => (
          <div key={i}>
            {player}: {correctPerPlayer[player]}
          </div>
        ))}
      </div>
    </div>
  );
};
