import { CorrectGuess } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";
import { useLetterInput } from "./useLetterInput";
import { useUsername } from "./useUsername";

export const useSubmitGuess = (roomId: string | undefined) => {
  const { letters, clearLetters } = useLetterInput();
  const { username } = useUsername();

  async function submitGuess() {
    await supabase.rpc<CorrectGuess>("submit_guess", {
      _room_id: roomId,
      _username: username,
      _word: letters,
    });
    clearLetters();
  }

  return {
    submitGuess,
  };
};
