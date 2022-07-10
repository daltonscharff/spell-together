import { useEffect, useState } from "react";
import { usePuzzle } from "../hooks/usePuzzle";
import { useLetterInput } from "../hooks/useLetterInput";
import { useKeyboardEvents } from "../hooks/useKeyboardEvents";
import { useSubmitGuess } from "../hooks/useSubmitGuess";

type Props = {
  disabled?: boolean;
};

type LetterCategory = "outer" | "invalid" | "center";

function checkLetterCategory(
  letter: string,
  outerLetters: string[],
  centerLetter: string
): LetterCategory {
  letter = letter.toLowerCase();
  if (letter === centerLetter) return "center";
  if (outerLetters.map((letter) => letter.toLowerCase()).includes(letter))
    return "outer";
  return "invalid";
}

const colors = {
  outer: "text-black",
  center: "text-yellow-300",
  invalid: "text-zinc-200",
};

export const LetterInput = ({ disabled }: Props) => {
  const [isFocused, setIsFocused] = useState(true);
  const { letters, addLetter, removeLetter } = useLetterInput();
  const { submitGuess } = useSubmitGuess();
  const { puzzle } = usePuzzle();
  useKeyboardEvents({
    onLetter: addLetter,
    onBackspace: removeLetter,
    onEnter: () => {
      if (letters.length === 0) return;
      console.log("ENTER CLICKED", letters);
      submitGuess();
    },
  });

  useEffect(() => {
    if (disabled) return setIsFocused(false);
    const handleInFocus = () => setIsFocused(true);
    const handleOutFocus = () => setIsFocused(false);
    window.addEventListener("focus", handleInFocus);
    window.addEventListener("blur", handleOutFocus);
    return () => {
      window.removeEventListener("focus", handleInFocus);
      window.removeEventListener("blur", handleOutFocus);
    };
  }, [disabled]);

  return (
    <div className="text-4xl text-center">
      {letters
        .toUpperCase()
        .split("")
        .map((letter, i) => {
          const category = checkLetterCategory(
            letter,
            (puzzle?.outer_letters as string[]) || [],
            puzzle?.center_letter || ""
          );
          const classes = `font-bold ${colors[category]}`;
          return (
            <span className={classes} key={i}>
              {letter}
            </span>
          );
        })}

      {isFocused && (
        <span className="animate-blink select-none font-thin absolute">|</span>
      )}
      {!isFocused && letters.length === 0 ? (
        <div className="text-zinc-300">Type or click...</div>
      ) : (
        <wbr />
      )}
    </div>
  );
};
