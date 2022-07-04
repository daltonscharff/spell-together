import { useContext } from "react";
import { LetterInputContext } from "../contexts/LetterInputContext";

export const useLetterInput = () => {
  const [letters, setLetters] = useContext(LetterInputContext);

  function addLetter(letter: string) {
    setLetters(letters + letter.toLowerCase());
  }

  function removeLetter() {
    setLetters(letters.slice(0, -1));
  }

  function clearLetters() {
    setLetters("");
  }

  return {
    letters,
    addLetter,
    removeLetter,
    clearLetters,
  };
};
