import type { NextPage } from "next";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import GameBoard from "../../components/GameBoard";

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

const GameRoom: NextPage = () => {
  const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g"]);
  const centerLetter = "d";

  const router = useRouter();
  Cookies.set("roomCode", router.query.code ?? "", { sameSite: "strict" });

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      Hello from room {router.query.code}
      <GameBoard
        letters={letters}
        centerLetter={centerLetter}
        onClick={(letter) => {
          console.log(letter);
        }}
      />
      <button onClick={jumble.bind(this, letters, setLetters)}>Jumble</button>
    </Container>
  );
};

export default GameRoom;
