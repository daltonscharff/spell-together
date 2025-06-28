import { useGuesses } from "../hooks/useGuesses";
import { useWords } from "../hooks/useWords";

export default function GuessList({
  roomId,
  puzzleId,
}: {
  roomId?: string;
  puzzleId?: string;
}) {
  const { guesses } = useGuesses(roomId, puzzleId);
  const { wordsMappedById } = useWords(puzzleId);

  return (
    <div>
      <div>Guesses:</div>
      <div>
        {guesses
          ?.map((guess) => wordsMappedById.get(guess.word_id)?.word)
          .filter(Boolean)
          .join(", ")}
      </div>
    </div>
  );
}
