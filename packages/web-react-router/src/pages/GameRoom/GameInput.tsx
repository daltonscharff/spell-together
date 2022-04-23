import LetterInput from "../../components/LetterInput";

export function GameInput() {
  return (
    <div>
      GameInput
      <LetterInput
        value={"abczg"}
        outerLetters={["a", "b", "c", "d", "e", "f"]}
        centerLetter={"g"}
        onChange={(_) => {}}
      />
    </div>
  );
}
