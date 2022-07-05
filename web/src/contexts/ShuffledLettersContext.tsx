import { createContext, FC, PropsWithChildren, useState } from "react";

export const ShuffledLettersContext = createContext<
  [string[], (state: string[]) => void]
>([[], () => {}]);

export const ShuffledLettersProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  return (
    <ShuffledLettersContext.Provider
      value={[shuffledLetters, setShuffledLetters]}
    >
      {children}
    </ShuffledLettersContext.Provider>
  );
};
