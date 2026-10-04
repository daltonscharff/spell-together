import { useTextInputContext } from "@/app/_contexts/textInputContext";
import { useEffect } from "react";

type HiveProps = {
  outerLetters: string[];
  centerLetter: string;
};

const translations = [
  [76, 0],
  [152, 43.5],
  [152, 130.5],
  [76, 174],
  [0, 130.5],
  [0, 43.5],
  [76, 87],
];

export const Hive = ({ outerLetters, centerLetter }: HiveProps) => {
  const { addLetter, removeLetter, submitText } = useTextInputContext();

  useEffect(() => {
    const keyboardListener = (event: KeyboardEvent) => {
      switch (event.code) {
        case "Backspace":
          removeLetter();
          return;
        case "Enter":
          submitText();
          return;
        default:
          const [_, character] = event.code.split("Key");
          if (!character) return;
          const letter = character.toLowerCase();
          addLetter(letter);
      }
    };

    document.addEventListener("keydown", keyboardListener);
    return () => document.removeEventListener("keydown", keyboardListener);
  }, [addLetter, removeLetter, submitText]);

  return (
    <svg viewBox="0 0 257 265" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <polygon id="hexagon" points="27,89 78,89 103,45.5 78,2 27,2 2,45.5" />
      </defs>
      {[...outerLetters, centerLetter].map((letter, i, array) => {
        const hexClasses = `cursor-pointer stroke-white stroke-[5px] ${
          i === array.length - 1
            ? "fill-amber-300/75 active:fill-amber-300"
            : "fill-zinc-200/75 active:fill-zinc-200"
        }`;
        return (
          <svg
            key={`hexagon_${i}_${letter}`}
            width="105"
            height="91"
            x={translations[i][0]}
            y={translations[i][1]}
            className="select-none cursor-pointer"
            onClick={() => addLetter(letter)}
          >
            <use href="#hexagon" className={hexClasses} />
            <text
              className="anchor-middle baseline-middle font-bold text-[1.65rem] pointer-events-none uppercase"
              x="50%"
              y="53%"
              textAnchor="middle"
              style={{
                dominantBaseline: "middle",
              }}
            >
              {letter}
            </text>
          </svg>
        );
      })}
    </svg>
  );
};
