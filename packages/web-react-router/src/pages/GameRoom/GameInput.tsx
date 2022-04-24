import { Hive } from "../../components/Hive";
import LetterInput from "../../components/LetterInput";
import { useLetterInput } from "../../hooks/useLetterInput";

type Props = {
  disabled?: boolean;
};

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
    </div>
  );
}
