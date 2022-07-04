import { useGuesses } from "../hooks/useGuesses";

type CorrectGuessListProps = {
  roomId?: string;
};

export const CorrectGuessList = ({ roomId }: CorrectGuessListProps) => {
  const { correctGuesses } = useGuesses(roomId);
  return (
    <div>
      {(correctGuesses || []).map((guess) => (
        <div key={guess.word_id}>
          <div>{guess.word}</div>
          <div>{guess.username}</div>
          <div>{guess.definition}</div>
        </div>
      ))}
    </div>
  );
};
