import { createContext, PropsWithChildren, useState } from "react";

export type LetterInputContextProps = PropsWithChildren<{}>;

export const LetterInputContext = createContext<
  [string, (value: string) => void]
>(["", () => {}]);

export const LetterInputProvider = (props: LetterInputContextProps) => {
  const [letters, setLetters] = useState<string>("");
  return (
    <LetterInputContext.Provider value={[letters, setLetters]}>
      {props.children}
    </LetterInputContext.Provider>
  );
};
