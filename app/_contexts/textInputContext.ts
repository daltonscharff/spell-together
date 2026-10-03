import { createContext, useContext } from "react";

export const TextInputContext = createContext<{
  textInput: string;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  clearTextInput: () => void;
  submitText: () => void;
  setTextInput: (text: string) => void;
}>({
  textInput: "",
  addLetter: () => {},
  removeLetter: () => {},
  clearTextInput: () => {},
  submitText: () => {},
  setTextInput: () => {},
});

export const useTextInputContext = () => useContext(TextInputContext);
