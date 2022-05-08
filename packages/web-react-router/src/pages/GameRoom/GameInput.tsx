import { Hive } from "../../components/Hive";
import { LetterInput } from "../../components/LetterInput";
import { useLetterInput } from "../../hooks/useLetterInput";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { shuffle } from "../../utils/shuffle";

type Props = {
  outerLetters: string[];
  centerLetter: string;
  onSubmit?: () => void;
  disabled?: boolean;
};

const ButtonContainer = styled(Container)`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;

export function GameInput({
  outerLetters,
  centerLetter,
  onSubmit = () => {},
  disabled = false,
}: Props) {
  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();
  const onEnter = () => {
    onSubmit();
    clearLetters();
  };
  const [shuffledLetters, setShuffledLetters] =
    useState<string[]>(outerLetters);

  useEffect(() => {
    setShuffledLetters(outerLetters);
  }, [outerLetters]);

  return (
    <div>
      <LetterInput
        value={letters}
        outerLetters={outerLetters}
        centerLetter={centerLetter}
        onAddLetter={addLetter}
        onBackspace={removeLetter}
        onEnter={onEnter}
        disabled={disabled}
      />
      <Hive
        outerLetters={shuffledLetters}
        centerLetter={centerLetter}
        onClick={addLetter}
      />
      <ButtonContainer>
        <Button onClick={removeLetter} disabled={disabled}>
          Delete
        </Button>
        <Button
          aria-label="Shuffle"
          onClick={() => setShuffledLetters(shuffle(shuffledLetters))}
          disabled={disabled}
        >
          <LoopIcon />
        </Button>
        <Button onClick={onEnter} disabled={disabled}>
          Enter
        </Button>
      </ButtonContainer>
    </div>
  );
}
