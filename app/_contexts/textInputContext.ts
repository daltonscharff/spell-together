import { createContext } from "react";

export const TextInputContext = createContext<{
  textInput: string;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  clearTextInput: () => void;
  setTextInput: (text: string) => void;
}>({
  textInput: "",
  addLetter: () => {},
  removeLetter: () => {},
  clearTextInput: () => {},
  setTextInput: () => {},
});
