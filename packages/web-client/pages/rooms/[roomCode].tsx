import type { NextPage } from "next";
import useStore from "../../hooks/useStore";
import Hive from "../../components/Hive";
import { useState } from "react";
import LetterInput from "../../components/LetterInput";
import Button from "../../components/Button";
import FoundWords from "../../components/FoundWords";
import ProgressBar from "../../components/ProgressBar";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

function shuffleLetters(letters: string[]): string[] {
  for (let i in letters) {
    const j = Math.floor(Math.random() * parseInt(i, 10));
    const temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }
  return [...letters];
}

const Room: NextPage = () => {
  const [inputLetters, setInputLetters] = useState("");
  const [letters, setLetters] = useState(useStore((state) => state.letters));
  const centerLetter = useStore((state) => state.centerLetter);
  const foundWords = useStore((state) => state.foundWords);
  const score = useStore((state) => state.score);
  const maxScore = useStore((state) => state.maxScore);
  const username = useStore((state) => state.username) || "UNKNOWN";

  return (
    <Layout className="font-Roboto">
      <Header date="January 10, 2022" username={username} />
      <ProgressBar currentScore={score} maxScore={maxScore} />
      <FoundWords words={foundWords} />
      <LetterInput
        value={inputLetters}
        onChange={(value) => setInputLetters(value.toUpperCase())}
      />
      <Hive
        letters={letters}
        centerLetter={centerLetter}
        onClick={(letter) => setInputLetters(inputLetters + letter)}
      />
      <div className="flex flex-row gap-4 justify-center my-6">
        <Button
          onClick={() =>
            setInputLetters(inputLetters.slice(0, inputLetters.length - 1))
          }
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setLetters(shuffleLetters(letters));
          }}
        >
          Shuffle
        </Button>
        <Button>Enter</Button>
      </div>
    </Layout>
  );
};

export default Room;
