import React, { ChangeEvent } from "react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import SocketContext from "../../providers/socketContext";
import InputArea from "./InputArea";
import Tiles from "./Tiles";
import { Socket } from "socket.io-client";

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

function init(socket: Socket) {
  console.log("INIT GAMEBOARD");
  socket.on("game:read", (value) => console.log("Gameboard:", value));
  socket.emit("game:read");
}

const GameBoard: React.FC<Props> = () => {
  const socket = useContext(SocketContext);
  const [input, setInput] = useState("");
  const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g"]);
  const centerLetter = "d";

  useEffect(init.bind(this, socket), []);

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
