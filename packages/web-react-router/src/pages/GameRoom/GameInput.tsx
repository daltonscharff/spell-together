import { Hive } from "../../components/Hive";
import LetterInput from "../../components/LetterInput";
import { useLetterInput } from "../../hooks/useLetterInput";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoopIcon from "@mui/icons-material/Loop";
import Container from "@mui/material/Container";

type Props = {
  disabled?: boolean;
};

const ButtonContainer = styled(Container)`
  width: 100%;
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;

export function GameInput({ disabled }: Props) {
  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();
  const outerLetters = ["b", "c", "d", "e", "f", "g"];
  const centerLetter = "a";
  return (
    <div>
      GameInput
      <LetterInput
        value={letters}
        outerLetters={outerLetters}
        centerLetter={centerLetter}
        onAddLetter={addLetter}
        onBackspace={removeLetter}
        onEnter={clearLetters}
        disabled={disabled}
      />
      <Hive
        outerLetters={outerLetters}
        centerLetter={centerLetter}
        onClick={addLetter}
      />
      <ButtonContainer>
        <Button>Delete</Button>
        <Button aria-label="Shuffle Letters">
          <LoopIcon />
        </Button>
        <Button>Enter</Button>
      </ButtonContainer>
    </div>
  );
}
