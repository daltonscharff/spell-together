import { createContext, FC, PropsWithChildren, useState } from "react";

export const LetterInputContext = createContext<
  [string, (state: string) => void]
>(["", () => {}]);

export const LetterInputProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [letters, setLetters] = useState("");
  return (
    <LetterInputContext.Provider value={[letters, setLetters]}>
      {children}
    </LetterInputContext.Provider>
  );
};
