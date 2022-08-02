import { useState } from "react";
import { ButtonArea } from "../components/ButtonArea";
import { CorrectGuessList } from "../components/CorrectGuessList";
import { FoundWordDisplay } from "../components/FoundWordDisplay";
import { Hive } from "../components/Hive";
import { LetterInput } from "../components/LetterInput";
import { PointDisplay } from "../components/PointDisplay";
import { usePuzzle } from "../hooks/usePuzzle";
import { useRoom } from "../hooks/useRoom";
import { shuffle } from "../utils/shuffle";

export const GameRoom = () => {
  const { room } = useRoom();
  const { puzzle } = usePuzzle(room?.puzzle_id);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>(
    (puzzle?.outer_letters as string[]) ?? []
  );

  return (
    <div className="container grid gap-8 grid-cols-1 md:grid-cols-2 flex-grow">
      <div className="flex flex-col gap-8 mx-auto max-w-sm min-w-[200px]">
        <LetterInput
          centerLetter={puzzle?.center_letter}
          outerLetters={puzzle?.outer_letters as string[]}
        />
        <Hive
          centerLetter={puzzle?.center_letter}
          outerLetters={shuffledLetters}
        />
        <ButtonArea
          shuffle={() => setShuffledLetters(shuffle(shuffledLetters))}
        />
      </div>
      <div className="flex flex-col mx-auto max-w-lg min-w-[200px] border-black border rounded-sm md:max-h-[600px]">
        <div className="p-4 border-b-2 border-black">
          <PointDisplay maxScore={puzzle?.max_score} />
        </div>
        <div className="p-4 border-b-2 border-black">
          <FoundWordDisplay />
        </div>
        <div className="p-2 overflow-y-auto">
          <CorrectGuessList />
        </div>
      </div>
    </div>
  );
};
