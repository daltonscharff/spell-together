import { Hive } from "../../components/Hive";
import { LetterInput } from "../../components/LetterInput";
import { useLetterInput } from "../../hooks/useLetterInput";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";
import Container from "@mui/material/Container";
import { useCallback, useState } from "react";

type Props = {
  outerLetters: string[];
  centerLetter: string;
  onSubmit: () => void;
  disabled?: boolean;
};

const ButtonContainer = styled(Container)`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;

function shuffle(items: any[]): any[] {
  items = [...items];
  for (let i in items) {
    const j = Math.floor(Math.random() * parseInt(i, 10));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
}

export function GameInput({
  centerLetter,
  onSubmit,
  disabled = false,
  ...rest
}: Props) {
  const [outerLetters, setOuterLetters] = useState(rest.outerLetters);
  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();
  const onEnter = useCallback(() => {
    onSubmit();
    clearLetters();
  }, [onSubmit, clearLetters]);

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
        outerLetters={outerLetters}
        centerLetter={centerLetter}
        onClick={addLetter}
      />
      <ButtonContainer>
        <Button onClick={removeLetter} disabled={disabled}>
          Delete
        </Button>
        <Button
          aria-label="Shuffle"
          onClick={() => setOuterLetters(shuffle(outerLetters))}
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
