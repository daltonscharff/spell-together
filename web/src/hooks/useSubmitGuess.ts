import { CorrectGuess } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";
import { useLetterInput } from "./useLetterInput";
import { useRoom } from "./useRoom";
import { useLocalStore } from "../hooks/useLocalStore";

export const useSubmitGuess = () => {
  const { room } = useRoom();
  const roomId = room?.id;
  const { letters, clearLetters } = useLetterInput();
  const username = useLocalStore((state) => state.username);

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
