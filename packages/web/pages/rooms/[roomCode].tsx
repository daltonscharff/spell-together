import type { NextPage } from "next";
import useStore from "../../hooks/useStore";
import Hive from "../../components/Hive";
import { useEffect, useState } from "react";
import LetterInput from "../../components/LetterInput";
import Button from "../../components/Button";
import FoundWords from "../../components/FoundWords";
import ProgressBar from "../../components/ProgressBar";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { socket } from "../../hooks/useSocket";

function shuffle(items: string[]): string[] {
  items = [...items];
  for (let i in items) {
    const j = Math.floor(Math.random() * parseInt(i, 10));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
}

const Room: NextPage = () => {
  const outerLetters = useStore((state) => state.outerLetters);
  const centerLetter = useStore((state) => state.centerLetter);
  const foundWords = useStore((state) => state.foundWords);
  const score = useStore((state) => state.score);
  const date = useStore((state) => state.date);
  const maxScore = useStore((state) => state.maxScore);
  const username = useStore((state) => state.username) || "UNKNOWN";
  const roomCode = useStore((state) => state.roomCode);
  const hasLoaded = useStore((state) => state.hasLoaded);

  const [shuffledLetters, setShuffledLetters] = useState(outerLetters);
  const [inputLetters, setInputLetters] = useState("");

  useEffect(() => setShuffledLetters(outerLetters), [outerLetters]);

  const addLetterToInput = (letter: string) => {
    if (inputLetters.length > 20) return;
    setInputLetters(inputLetters + letter.toUpperCase());
  };

  const deleteLetterFromInput = () =>
    setInputLetters(inputLetters.slice(0, inputLetters.length - 1));

  const handleLetterInput = (key: string) => {
    if (/[a-zA-Z]/.test(key) && key.length === 1) {
      addLetterToInput(key);
    } else if (key === "Backspace") {
      deleteLetterFromInput();
    } else if (key === "Enter") {
      submitInput();
    }
  };

  const submitInput = () => {
    socket.emit("submitWord", {
      username,
      roomCode,
      word: inputLetters,
    });
    setInputLetters("");
  };

  if (!hasLoaded)
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader />
      </div>
    );

  return (
    <Layout className="font-Roboto min-w-[260px]">
      <Header date={date} username={username} />
      <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row-reverse">
        <div className="flex flex-grow flex-col gap-4">
          <ProgressBar currentScore={score} maxScore={maxScore} />
          <div className="hidden sm:block h-full">
            <FoundWords words={foundWords} />
          </div>
          <div className="sm:hidden">
            <FoundWords words={foundWords} collapsible />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <LetterInput
            value={inputLetters}
            outerLetters={outerLetters}
            centerLetter={centerLetter}
            onChange={(value) => handleLetterInput(value)}
          />
          <Hive
            outerLetters={shuffledLetters}
            centerLetter={centerLetter}
            onClick={(letter) => addLetterToInput(letter)}
          />
          <div className="flex flex-col xs:flex-row gap-4 justify-center my-6">
            <Button className="xs:w-24" onClick={() => deleteLetterFromInput()}>
              Delete
            </Button>
            <Button
              onClick={() => {
                setShuffledLetters(shuffle(shuffledLetters));
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
            <Button className="xs:w-24" onClick={submitInput}>
              Enter
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Room;
