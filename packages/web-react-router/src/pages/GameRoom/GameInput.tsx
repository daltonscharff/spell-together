import LetterInput from "../../components/LetterInput";
import { useLetterInput } from "../../hooks/useLetterInput";

export function GameInput() {
  const { letters, addLetter, removeLetter, clearLetters } = useLetterInput();
  return (
    <div>
      GameInput
      <LetterInput
        value={letters}
        outerLetters={["a", "b", "c", "d", "e", "f"]}
        centerLetter={"g"}
        onAddLetter={addLetter}
        onBackspace={removeLetter}
        onEnter={clearLetters}
      />
    </div>
  );
}
