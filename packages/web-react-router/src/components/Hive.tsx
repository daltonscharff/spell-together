import { styled } from "@mui/material/styles";

type Props = {
  outerLetters: string[];
  centerLetter: string;
  onClick?: (letter: string) => void;
};

const Container = styled("svg")`
  max-width: 300px;
  margin: 0 auto;
`;
const Hexagon = styled("path")`
  stroke-width: 2px;
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

  return (
    <Container viewBox="0 0 286 307" xmlns="http://www.w3.org/2000/svg">
      <CenterHexagon
        d="M168.279 109.72L193.654 153.238L168.654 196.539L118.279 196.322L92.9042 152.805L117.904 109.503L168.279 109.72Z"
        onClick={() => onClick(centerLetter)}
      />
      <Text x="143" y="157" onClick={() => onClick(centerLetter)}>
        {centerLetter}
      </Text>
      <Hexagon
        d="M191.286 68.536L240.509 68.7475L265.304 111.27L240.884 153.567L191.661 153.355L166.866 110.832L191.286 68.536Z"
        onClick={() => onClick(outerLetters[0])}
      />
      <Text x="216.8" y="114.6" onClick={() => onClick(outerLetters[0])}>
        {outerLetters[0]}
      </Text>
      <Hexagon
        d="M192.026 153.256L241.249 153.467L266.043 195.99L241.624 238.286L192.401 238.075L167.606 195.552L192.026 153.256Z"
        onClick={() => onClick(outerLetters[1])}
      />
      <Text x="216.8" y="199.4" onClick={() => onClick(outerLetters[1])}>
        {outerLetters[1]}
      </Text>
      <Hexagon
        d="M118.286 194.976L167.509 195.187L192.304 237.71L167.884 280.006L118.661 279.795L93.8665 237.272L118.286 194.976Z"
        onClick={() => onClick(outerLetters[2])}
      />
      <Text x="143" y="241.8" onClick={() => onClick(outerLetters[2])}>
        {outerLetters[2]}
      </Text>
      <Hexagon
        d="M44.6745 152.476L93.8976 152.687L118.692 195.21L94.2726 237.506L45.0495 237.295L20.2547 194.772L44.6745 152.476Z"
        onClick={() => onClick(outerLetters[3])}
      />
      <Text x="69.2" y="199.4" onClick={() => onClick(outerLetters[3])}>
        {outerLetters[3]}
      </Text>
      <Hexagon
        d="M43.9352 67.7558L93.1584 67.9674L117.953 110.49L93.5334 152.786L44.3102 152.575L19.5154 110.052L43.9352 67.7558Z"
        onClick={() => onClick(outerLetters[4])}
      />
      <Text x="69.2" y="114.6" onClick={() => onClick(outerLetters[4])}>
        {outerLetters[4]}
      </Text>
      <Hexagon
        d="M117.674 26.036L166.898 26.2475L191.692 68.7703L167.273 111.067L118.049 110.855L93.2547 68.3323L117.674 26.036Z"
        onClick={() => onClick(outerLetters[5])}
      />
      <Text x="143" y="72.2" onClick={() => onClick(outerLetters[5])}>
        {outerLetters[5]}
      </Text>
    </Container>
  );
};
