"use client";

import { useParams } from "next/navigation";
import { ScoreDisplay } from "./_components/ScoreDisplay";
import { FoundWordList } from "./_components/FoundWordList";
import { useFoundWords } from "@/app/_hooks/useFoundWords";
import { Button } from "./_components/Button";
import { ShuffleButton } from "./_components/Button/ShuffleButton";
import { Hive } from "./_components/Hive";
import { TextInput } from "./_components/TextInput";
import { useState } from "react";
import { TextInputContext } from "@/app/_contexts/textInputContext";
import { useSelectedPuzzleIdContext } from "@/app/_contexts/selectedPuzzleIdContext";
import { usePuzzle } from "@/app/_hooks/usePuzzle";

export default function Room() {
  const { shortcode } = useParams<{ shortcode: string }>();
  const { foundWords } = useFoundWords();
  const { selectedPuzzleId } = useSelectedPuzzleIdContext();
  const { puzzle } = usePuzzle(selectedPuzzleId);
  const { outerLetters, centerLetter } = puzzle || {
    outerLetters: [],
    centerLetter: "",
  };
  const [textInput, setTextInput] = useState("");

  function clearTextInput() {
    setTextInput("");
  }

  function addLetter(letter: string) {
    setTextInput((prev) =>
      prev.length < 20 ? prev.concat(letter.toLowerCase()) : prev,
    );
  }

  function removeLetter() {
    setTextInput((prev) => prev.substring(0, prev.length - 1));
  }

  function submitText() {
    // TODO: submit answer
    clearTextInput();
  }

  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <div className="flex-1 flex flex-col-reverse justify-end md:grid md:grid-cols-2 gap-2 my-2">
      <div className="flex-grow flex flex-col justify-center items-center gap-6 my-6">
        {/* <div>Hello from ROOM: {shortcode}</div> */}
        <TextInputContext
          value={{
            textInput,
            setTextInput,
            addLetter,
            removeLetter,
            submitText,
            clearTextInput,
          }}
        >
          <div className="w-full max-w-72">
            <TextInput
              centerLetter={centerLetter}
              outerLetters={outerLetters}
            />
          </div>
          <div className="w-full max-w-72">
            <Hive centerLetter={centerLetter} outerLetters={outerLetters} />
          </div>
          <div className="flex flex-row justify-center gap-3">
            <Button onClick={removeLetter}>Delete</Button>
            <ShuffleButton />
            <Button onClick={submitText}>Enter</Button>
          </div>
        </TextInputContext>
      </div>

      <div className="flex flex-col gap-4 max-h-160">
        <ScoreDisplay currentScore={1} maxScore={100} />
        <div className="block md:hidden max-h-150">
          <FoundWordList isCollapsible foundWords={foundWords} />
        </div>
        <div className="hidden md:block max-h-full">
          <FoundWordList foundWords={foundWords} />
        </div>
      </div>
    </div>
  );
}
