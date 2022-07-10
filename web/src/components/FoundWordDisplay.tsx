import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { useMemo } from "react";

type Props = {
  roomId?: string;
};

export const FoundWordDisplay = ({ roomId }: Props) => {
  const { correctGuesses } = useCorrectGuesses(roomId);
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
      <div className="font-semibold">
        Found Words: {correctGuesses?.length || 0}
      </div>
      <div className="font-light flex flex-row flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto">
        {playersSortedByCorrectGuesses.map((player, i) => (
          <div key={i}>
            <span className="px-2 border rounded-l-sm bg-zinc-50">
              {player}
            </span>
            <span className="px-2 border-y border-r rounded-r-sm bg-zinc-50">
              {correctPerPlayer[player]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
