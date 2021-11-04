import React from "react";
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

const GameBoard: React.FC<Props> = () => {
  const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g"]);
  const centerLetter = "d";
  return (
    <>
      <InputArea onJumble={() => jumble(letters, setLetters)} />
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
