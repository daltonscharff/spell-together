import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { useMemo } from "react";

export const FoundWordDisplay = () => {
  const { correctGuesses, selectedUser, setSelectedUser } = useCorrectGuesses();
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
      {playersSortedByCorrectGuesses.length > 0 && (
        <div className="font-light flex flex-row flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto">
          {playersSortedByCorrectGuesses.map((player, i) => {
            const color =
              player === selectedUser
                ? "bg-zinc-700 text-white border-zinc-500"
                : "bg-zinc-50";
            return (
              <div
                key={i}
                onClick={() => setSelectedUser(player)}
                className={`cursor-pointer select-none`}
              >
                <span className={`px-2 border rounded-l-sm ${color}`}>
                  {player}
                </span>
                <span
                  className={`px-2 border-y border-r rounded-r-sm ${color}`}
                >
                  {correctPerPlayer[player]}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
