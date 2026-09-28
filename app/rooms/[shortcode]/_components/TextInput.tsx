import { TextInputContext } from "@/app/_contexts/textInputContext";
import { useContext, useEffect, useState } from "react";

type TextInputProps = {
  outerLetters: string[];
  centerLetter: string;
};

export function TextInput({ outerLetters, centerLetter }: TextInputProps) {
  const { textInput } = useContext(TextInputContext);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad && textInput) {
      setFirstLoad(false);
    }
  }, [textInput]);

  return (
    <div className="flex flex-row flex-wrap justify-center text-3xl">
      <span className="font-bold uppercase">
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
      </span>
      <div className="w-0.5 h-auto bg-amber-300 animate-blink mx-[1px]" />
      {firstLoad && textInput.length === 0 && (
        <span className="text-zinc-400">Type or click</span>
      )}
    </div>
  );
}
