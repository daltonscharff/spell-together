import type { NextPage } from "next";
import useStore from "../../hooks/useStore";
import Hive from "../../components/Hive";
import { useRef, useState } from "react";
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
  const letterInputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout className="font-Roboto">
      <Header date="January 10, 2022" username={username} />
      <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row-reverse">
        <div className="flex flex-grow flex-col gap-4">
          <ProgressBar currentScore={score} maxScore={maxScore} />
          <FoundWords words={foundWords} />
        </div>
        <div
          className="flex flex-col gap-4 justify-center"
          onClick={() => letterInputRef.current?.focus()}
        >
          <LetterInput
            value={inputLetters}
            validLetters={letters}
            centerLetter={centerLetter}
            inputRef={letterInputRef}
            onChange={(value) => setInputLetters(value.toUpperCase())}
          />
          <Hive
            letters={letters}
            centerLetter={centerLetter}
            onClick={(letter) => setInputLetters(inputLetters + letter)}
          />
          <div className="flex flex-col xs:flex-row gap-4 justify-center my-6">
            <Button
              className="xs:w-24"
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
              className="px-3 flex justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 100 100"
                className="w-6"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  stroke="black"
                  strokeWidth="6"
                  fill="white"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  strokeWidth="20"
                  stroke="white"
                />
                <polygon points="18,0 18,20 38,20" fill="black" />
                <polygon points="82,100 82,80 62,80" fill="black" />
              </svg>
            </Button>
            <Button className="xs:w-24">Enter</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Room;
