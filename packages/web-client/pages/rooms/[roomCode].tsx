import type { NextPage } from "next";
import { useRouter } from "next/router";
import { socket } from "../../hooks/useSocket";
import useStore from "../../hooks/useStore";
import Hive from "../../components/Hive";
import { useEffect, useState } from "react";
import LetterInput from "../../components/LetterInput";
import Button from "../../components/Button";

const Room: NextPage = () => {
  const router = useRouter();
  const [inputLetters, setInputLetters] = useState("");
  const roomCode = useStore((state) => state.roomCode);
  const username = useStore((state) => state.username);
  const letters = useStore((state) => state.letters);
  const centerLetter = useStore((state) => state.centerLetter);
  console.log({ letterInput: inputLetters });

  return (
    <>
      <LetterInput
        value={inputLetters}
        onChange={(value) => setInputLetters(value.toUpperCase())}
      />
      <Hive
        letters={letters}
        centerLetter={centerLetter}
        onClick={(letter) => setInputLetters(inputLetters + letter)}
      />
      <Button>Delete</Button>
      <Button>Shuffle</Button>
      <Button>Enter</Button>
    </>
  );
};

export default Room;
