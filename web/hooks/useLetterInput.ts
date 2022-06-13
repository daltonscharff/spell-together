import { useState } from "react";

export const useLetterInput = () => {
  const [letters, setLetters] = useState<string>("");

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
