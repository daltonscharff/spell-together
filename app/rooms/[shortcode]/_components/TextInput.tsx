import { TextInputContext } from "@/app/_contexts/textInputContext";
import { useContext } from "react";

type TextInputProps = {
  outerLetters: string[];
  centerLetter: string;
};

export function TextInput({ outerLetters, centerLetter }: TextInputProps) {
  const { textInput, setTextInput } = useContext(TextInputContext);

  return (
    <div className="flex flex-row flex-wrap justify-center text-3xl font-bold uppercase">
      {textInput
        .toLowerCase()
        .split("")
        .map((letter, i) => {
          if (letter === centerLetter) {
            return (
              <span key={`centerLetter_${i}`} className="text-amber-300!">
                {letter}
              </span>
            );
          }
          if (!outerLetters.includes(letter)) {
            return (
              <span key={`invalidLetter_${i}`} className="text-zinc-400">
                {letter}
              </span>
            );
          }
          return <span key={`validLetter_${i}`}>{letter}</span>;
        })}
    </div>
  );
}
