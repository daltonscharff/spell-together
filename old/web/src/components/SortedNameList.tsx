import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { useMemo } from "react";
import { CorrectGuess } from "../types/supabase";

type Props = {
  sortBy: "words" | "points";
};

function sort(guesses: CorrectGuess[], sortBy: Props["sortBy"]) {
  const summation: Record<string, number> = {};

  if (sortBy === "words") {
    guesses?.forEach((guess) => {
      summation[guess.username!]
        ? (summation[guess.username!] += 1)
        : (summation[guess.username!] = 1);
    });
  } else {
    guesses?.forEach((guess) => {
      summation[guess.username!]
        ? (summation[guess.username!] += guess.point_value ?? 0)
        : (summation[guess.username!] = guess.point_value ?? 0);
    });
  }

  const sortedNames = Object.keys(summation).sort((a, b) => {
    const countA = summation[a];
    const countB = summation[b];
    if (countA === countB) return a.localeCompare(b);
    return countB - countA;
  });

  return sortedNames.map((username) => ({
    username,
    value: summation[username],
  }));
}

export const SortedNameList = ({ sortBy }: Props) => {
  const { correctGuesses, selectedUser, setSelectedUser } = useCorrectGuesses();
  const sortedPlayerList = useMemo(
    () => sort(correctGuesses ?? [], sortBy),
    [correctGuesses, sortBy]
  );

  return (
    <div>
      {sortedPlayerList.length > 0 && (
        <div className="font-light flex flex-row flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto">
          {sortedPlayerList.map((player, i) => {
            const color =
              player.username === selectedUser
                ? "bg-zinc-700 text-white border-zinc-500"
                : "bg-zinc-50";
            return (
              <div
                key={i}
                onClick={() => setSelectedUser(player.username)}
                className={`cursor-pointer select-none`}
              >
                <span className={`px-2 border rounded-l-sm ${color}`}>
                  {player.username}
                </span>
                <span
                  className={`px-2 border-y border-r rounded-r-sm ${color}`}
                >
                  {player.value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
