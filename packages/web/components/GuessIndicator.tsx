import { FC, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const GuessIndicator: FC = () => {
  const [color, setColor] = useState<string>();
  const [animation, setAnimation] = useState<string>();

  const fadeOut = (color: string) => {
    setColor(color);
    setAnimation(`animate-[fadeOut_2000ms]`);
    setTimeout(() => {
      setColor("");
      setAnimation("");
    }, 2000);
  };

  useSocket("incorrectGuess", () => fadeOut("bg-red-100"));
  useSocket("correctGuess", () => fadeOut("bg-emerald-100"));

  return (
    <div
      className={`w-full rounded-full min-h-[.25rem] ${color} ${animation}`}
    />
  );
};

export default GuessIndicator;
