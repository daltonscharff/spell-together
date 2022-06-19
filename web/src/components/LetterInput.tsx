import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

type Props = {
  value: string;
  outerLetters: string[];
  centerLetter: string;
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

const Letter = styled("span")`
  color: ${(props: { category: LetterCategory }) => {
    const colors = {
      outer: "black",
      center: "#FED74E",
      invalid: "lightgray",
    };
    return colors[props.category];
  }};
  font-weight: bold;
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const Blinker = styled("span")`
  animation: ${blink} 1200ms steps(1, end) infinite;
  margin-left: 1px;
  user-select: none;
  font-weight: 100;
  position: absolute;
  font-family: sans serif;
`;

const PlaceholderText = styled(Box)`
  color: lightgrey;
`;

const Container = styled(Box)`
  font-size: 2em;
  text-align: center;
`;

export const LetterInput = ({
  value,
  outerLetters,
  centerLetter,
  disabled,
}: Props) => {
  const [isFocused, setIsFocused] = useState(true);

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
    <Container>
      {value
        .toUpperCase()
        .split("")
        .map((letter, i) => {
          const category = checkLetterCategory(
            letter,
            outerLetters,
            centerLetter
          );
          return (
            <Letter key={i} category={category}>
              {letter}
            </Letter>
          );
        })}

      {isFocused && <Blinker>|</Blinker>}
      {!isFocused && value.length === 0 ? (
        <PlaceholderText>Type or click...</PlaceholderText>
      ) : (
        <wbr />
      )}
    </Container>
  );
};
