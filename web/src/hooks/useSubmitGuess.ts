import { CorrectGuess } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";
import { useLetterInput } from "./useLetterInput";
import { useRoom } from "./useRoom";
import { useLocalStore } from "../hooks/useLocalStore";
import { useNotifications } from "./useNotifications";
import { usePuzzle } from "./usePuzzle";
import { useCorrectGuesses } from "./useCorrectGuesses";

function validateSubmission(
  guess: string,
  outerLetters: string[],
  centerLetter: string,
  correctGuesses: CorrectGuess[]
): string {
  const allLetters = [...outerLetters, centerLetter];

  if (guess.length < 4) return "too short";

  if (!guess.includes(centerLetter)) return "missing center letter";

  const duplicateGuess = correctGuesses.find(
    (correctGuess) => correctGuess.word === guess
  );
  if (duplicateGuess) return `already found by ${duplicateGuess.username}`;

  if (guess.split("").find((letter) => !allLetters.includes(letter)))
    return "bad letters";

  return "";
}

export const useSubmitGuess = () => {
  const { room } = useRoom();
  const { puzzle } = usePuzzle();
  const { letters, clearLetters } = useLetterInput();
  const username = useLocalStore((state) => state.username);
  const setGuessNotification = useNotifications(
    (state) => state.setGuessResponse
  );
  const { correctGuesses, mutate } = useCorrectGuesses();

  async function submitGuess() {
    const guessedWord = letters;
    if (guessedWord.length === 0) return;

    clearLetters();
    if (!puzzle || !room) return;

    const errorMsg = validateSubmission(
      guessedWord,
      puzzle.outer_letters,
      puzzle.center_letter,
      correctGuesses || []
    );

    if (errorMsg) {
      setGuessNotification(false, guessedWord, errorMsg);
      return;
    }

    const guessResponse = await supabase.rpc<CorrectGuess>("submit_guess", {
      _room_id: room.id,
      _puzzle_id: puzzle.id,
      _username: username,
      _word: guessedWord,
    });

    if (guessResponse?.body?.length) {
      const points = guessResponse.body?.[0].point_value;
      mutate();
      setGuessNotification(
        true,
        guessedWord,
        points === 1 ? `1 point` : `${points} points`
      );
    } else {
      setGuessNotification(false, guessedWord, "not in word list");
    }
  }

  return {
    submitGuess,
  };
};
