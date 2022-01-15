import { CSSProperties, FC } from "react";

type Props = {
  letters: string[];
  centerLetter: string;
  onClick?: (letter: string) => void;
};

const cells = [
  {
    id: "top",
    x: 75,
    y: 0,
  },
  {
    id: "top-left",
    x: 0,
    y: 43.3,
  },
  {
    id: "top-right",
    x: 0,
    y: 129.9,
  },
  {
    id: "bottom",
    x: 75,
    y: 173.2,
  },
  {
    id: "bottom-left",
    x: 150,
    y: 43.3,
  },
  {
    id: "bottom-right",
    x: 150,
    y: 129.9,
  },
];

const hexagonStyle: CSSProperties = {
  strokeWidth: "6px",
  stroke: "white",
  cursor: "pointer",
};
const textStyle: CSSProperties = {
  dominantBaseline: "middle",
  textAnchor: "middle",
  cursor: "pointer",
};

const Hive: FC<Props> = ({
  letters,
  centerLetter,
  onClick = (_: string) => {},
}) => {
  centerLetter = centerLetter.toUpperCase();
  letters = letters
    .map((letter) => letter.toUpperCase())
    .filter((letter) => letter !== centerLetter);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 250 259.8"
      className="max-w-[280px] mx-auto"
    >
      <defs>
        <symbol id="hexagon">
          <polygon points={"25 0, 75 0, 100 43.3, 75 86.6, 25 86.6, 0 43.3"} />
        </symbol>
        {letters.map((letter, i) => (
          <symbol key={letter} id={cells[i].id}>
            <use
              href="#hexagon"
              style={hexagonStyle}
              className="fill-zinc-100"
            />
            <text
              x="50%"
              y="55%"
              style={textStyle}
              className="font-bold text-3xl"
            >
              {letter}
            </text>
          </symbol>
        ))}
        <symbol id="center">
          <use
            href="#hexagon"
            style={hexagonStyle}
            className="fill-yellow-300"
          />
          <text
            x="50%"
            y="55%"
            style={textStyle}
            className="font-bold text-3xl"
          >
            {centerLetter}
          </text>
        </symbol>
      </defs>

      {letters.map((letter, i) => (
        <use
          href={`#${cells[i].id}`}
          onClick={() => onClick(letter)}
          x={cells[i].x}
          y={cells[i].y}
          width="100"
          height="86.6"
          key={letter}
        />
      ))}
      <use
        href="#center"
        onClick={() => onClick(centerLetter)}
        x="75"
        y="86.6"
        width="100"
        height="86.6"
      />
    </svg>
  );
};

export default Hive;
