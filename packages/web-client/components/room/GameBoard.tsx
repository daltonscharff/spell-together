import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  ChangeEvent,
} from "react";
import InputArea from "./InputArea";
import Tiles from "./Tiles";
import { Puzzle } from "@daltonscharff/spelling-bee-core";
import { useRecoilState } from "recoil";
import {
  socket,
  centerLetterState,
  lettersState,
} from "../../atoms/socketState";

interface Props {}

function jumble(
  letters: string[],
  setLetters: Dispatch<SetStateAction<string[]>>
) {
  const array = [...letters];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  setLetters(array);
}

function handleInputAreaChange(
  setInput: Dispatch<SetStateAction<string>>,
  letters: string[],
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const inputChar = event.target.value?.toLowerCase().split("").pop();
  if (inputChar === undefined) {
    setInput("");
  } else if (letters.includes(inputChar)) {
    setInput(event.target.value.toLowerCase());
  }
}

function handleTilesClick(
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  letter: string
) {
  setInput(input + letter);
}

const GameBoard: React.FC<Props> = () => {
  const [input, setInput] = useState("");
  const [letters, setLetters] = useRecoilState(lettersState);
  const [centerLetter, setCenterLetter] = useRecoilState(centerLetterState);

  useEffect(() => {
    socket?.on("game:read", (puzzle: Puzzle) => {
      setLetters(puzzle.letters);
      setCenterLetter(puzzle.centerLetter);
    });
    socket?.emit("game:read");
  }, [socket]);

  return (
    <>
      <InputArea
        input={input}
        setInput={setInput}
        onChange={handleInputAreaChange.bind(this, setInput, letters)}
        onJumble={jumble.bind(this, letters, setLetters)}
      />
      <Tiles
        letters={letters}
        centerLetter={centerLetter}
        onClick={handleTilesClick.bind(this, input, setInput)}
      />
    </>
  );
};

export default GameBoard;
