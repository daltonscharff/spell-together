import { styled } from "@mui/material/styles";

type Props = {
  outerLetters: string[];
  centerLetter: string;
  onClick?: (letter: string) => void;
};

const Container = styled("svg")`
  margin: 0 auto;
`;
const Hexagon = styled("use")`
  stroke-width: 1px;
  stroke: black;
  cursor: pointer;
  fill: white;
`;
const CenterHexagon = styled(Hexagon)`
  fill: #fee383;
`;
const Text = styled("text")`
  dominant-baseline: middle;
  text-anchor: middle;
  cursor: pointer;
  font-weight: bold;
  font-size: 2em;
  user-select: none;
`;

export const Hive = ({
  outerLetters,
  centerLetter,
  onClick = (_: string) => {},
}: Props) => {
  centerLetter = centerLetter.toUpperCase();
  outerLetters = outerLetters.map((letter) => letter.toUpperCase());

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
    <Container viewBox="0 0 257 265" xmlns="http://www.w3.org/2000/svg">
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
        const Hex = i < array.length - 1 ? Hexagon : CenterHexagon;
        const handleClick = () => onClick(letter);
        return (
          <svg
            width="105"
            height="91"
            x={translations[i][0]}
            y={translations[i][1]}
          >
            <Hex href="#hexagon" onClick={handleClick} />
            <Text
              x="50%"
              y="54%"
              dominant-baseline="middle"
              text-anchor="middle"
              onClick={handleClick}
            >
              {letter}
            </Text>
          </svg>
        );
      })}
    </Container>
  );
};
