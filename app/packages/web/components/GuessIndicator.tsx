import { FC, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const GuessIndicator: FC = ({ children }) => {
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
  useSocket("correctGuess", () => fadeOut("bg-green-400/20"));

  return (
    <div className={`w-full rounded-lg min-h-[.25rem] ${color} ${animation}`}>
      {children}
    </div>
  );
};

export default GuessIndicator;
