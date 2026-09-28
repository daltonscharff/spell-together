import { createContext } from "react";

export const TextInputContext = createContext<{
  textInput: string;
  setTextInput: (text: string) => void;
}>({
  textInput: "",
  setTextInput: () => {},
});
