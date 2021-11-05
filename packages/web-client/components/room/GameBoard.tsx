import React, { ChangeEvent } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import InputArea from "./InputArea";
import Tiles from "./Tiles";

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

function handleInput(
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

const GameBoard: React.FC<Props> = () => {
  const [input, setInput] = useState("");
  const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g"]);
  const centerLetter = "d";
  return (
    <>
      <InputArea
        input={input}
        setInput={setInput}
        handleInput={handleInput.bind(this, setInput, letters)}
        onJumble={jumble.bind(this, letters, setLetters)}
      />
      <Tiles
        letters={letters}
        centerLetter={centerLetter}
        onClick={(letter) => {
          console.log(letter);
        }}
      />
    </>
  );
};

export default GameBoard;
