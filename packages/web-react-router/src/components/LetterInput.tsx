import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

type Props = {
  value: string;
  outerLetters: string[];
  centerLetter: string;
  onAddLetter: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
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
      center: "gold",
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

const BlinkingCursor = styled(Box)`
  color: gold;
  animation: ${blink} 1200ms steps(1, end) infinite;
  margin-left: 1px;
  user-select: none;
`;

const PlaceholderText = styled(Box)`
  color: lightgrey;
`;

const Container = styled(Box)`
  display: flex;
  font-size: 2em;
  align-items: baseline;
`;

const LetterInput = ({
  value,
  outerLetters,
  centerLetter,
  onAddLetter,
  onBackspace,
  onEnter,
  disabled,
}: Props) => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    if (disabled) return;
    const registerEvent = ({ key }: KeyboardEvent) => {
      if (/[a-zA-Z]/.test(key) && key.length === 1) {
        onAddLetter(key);
      } else if (key === "Backspace") {
        onBackspace();
      } else if (key === "Enter") {
        onEnter();
      }
    };
    window.addEventListener("keydown", registerEvent);
    return () => {
      window.removeEventListener("keydown", registerEvent);
    };
  }, [onAddLetter, onBackspace, onEnter, disabled]);

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

      {isFocused && <BlinkingCursor>|</BlinkingCursor>}

      {!isFocused && value.length === 0 && (
        <PlaceholderText>Type or click...</PlaceholderText>
      )}
    </Container>
  );
};

export default LetterInput;
