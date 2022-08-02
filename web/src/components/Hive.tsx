import { useLetterInput } from "../hooks/useLetterInput";

type Props = {
  centerLetter?: string;
  outerLetters?: string[];
};

export const Hive = ({
  centerLetter = "",
  outerLetters = Array(6).fill(""),
}: Props) => {
  const { addLetter } = useLetterInput();

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
    <svg
      className="m-0"
      viewBox="0 0 257 265"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="hexagon">
          <path
            d="M 27 89
            L 78 89
            L 103 45.5
            L 78 2
            L 27 2
            L 2 45.5      
            Z"
          ></path>
        </g>
      </defs>
      {[...outerLetters, centerLetter].map((letter, i, array) => {
        letter = letter.toUpperCase();
        const hexClasses = `cursor-pointer fill-white stroke-black stroke-2 ${
          i === array.length - 1 && "fill-yellow-300"
        }`;
        const handleClick = () => addLetter(letter);
        return (
          <svg
            key={`hexagon_${i}`}
            width="105"
            height="91"
            x={translations[i][0]}
            y={translations[i][1]}
          >
            <use href="#hexagon" className={hexClasses} onClick={handleClick} />
            <text
              className="cursor-pointer anchor-middle baseline-middle font-bold text-3xl select-none"
              x="50%"
              y="54%"
              onClick={handleClick}
            >
              {letter}
            </text>
          </svg>
        );
      })}
    </svg>
  );
};
