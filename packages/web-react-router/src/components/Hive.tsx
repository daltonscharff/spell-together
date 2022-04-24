import { CSSProperties, FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

type Props = {
  outerLetters: string[];
  centerLetter: string;
  onClick?: (letter: string) => void;
};

const Container = styled("svg")`
  max-width: 280px;
  margin: 0 auto;
`;
const Hexagon = styled("use")`
  stroke-width: 3px;
  stroke: black;
  box-shadow: 0 0 1px 0 black;
  cursor: pointer;
  fill: white;
`;
const CenterHexagon = styled(Hexagon)`
  fill: gold;
`;
const Text = styled("text")`
  dominant-baseline: middle;
  text-anchor: middle;
  cursor: pointer;
  font-weight: bold;
  font-size: 2em;
`;

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

export const Hive: FC<Props> = ({
  outerLetters,
  centerLetter,
  onClick = (_: string) => {},
}) => {
  centerLetter = centerLetter.toUpperCase();
  outerLetters = outerLetters.map((letter) => letter.toUpperCase());

  return (
    <Container
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 250 259.8"
    >
      <defs>
        <polygon
          id="hexagon"
          points={"25 0, 75 0, 100 43.3, 75 86.6, 25 86.6, 0 43.3"}
        />
        <clipPath id="insideHexagon">
          <use href="#hexagon" />
        </clipPath>
        {outerLetters.map((letter, i) => (
          <symbol key={letter + i} id={cells[i].id}>
            <Hexagon href="#hexagon" clipPath="url(#insideHexagon)" />
            <Text x="50%" y="55%">
              {letter}
            </Text>
          </symbol>
        ))}
        <symbol id="center">
          <CenterHexagon href="#hexagon" />
          <Text x="50%" y="55%">
            {centerLetter}
          </Text>
        </symbol>
      </defs>

      {outerLetters.map((letter, i) => (
        <use
          href={`#${cells[i].id}`}
          onClick={() => onClick(letter)}
          x={cells[i].x}
          y={cells[i].y}
          width="100"
          height="86.6"
          key={letter + i}
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
    </Container>
  );
};
