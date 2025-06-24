import { useLetterInput } from "../hooks/useLetterInput";
import { usePuzzle } from "../hooks/usePuzzle";

export const Hive = () => {
  const { addLetter } = useLetterInput();
  const { centerLetter, outerLetters } = usePuzzle();

  const translations = [
    [76, 0],
    [152, 43.5],
    [152, 130.5],
    [76, 174],
    [0, 130.5],
    [0, 43.5],
    [76, 87],
  ];

  return (
    <svg viewBox="0 0 257 265" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <polygon id="hexagon" points="27,89 78,89 103,45.5 78,2 27,2 2,45.5" />
      </defs>
      {[...outerLetters, centerLetter].map((letter, i, array) => {
        letter = letter.toUpperCase();
        const hexClasses = `cursor-pointer fill-white stroke-black stroke-2 ${
          i === array.length - 1 && "fill-yellow-300"
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
              className="anchor-middle baseline-middle font-bold text-3xl pointer-events-none"
              x="50%"
              y="54%"
            >
              {letter}
            </text>
          </svg>
        );
      })}
    </svg>
  );
};
