import { createContext, FC, PropsWithChildren, useState } from "react";

export const PuzzleIdContext = createContext<
  [string | null, (state: string | null) => void]
>([null, () => {}]);

export const PuzzleIdProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [puzzleId, setPuzzleId] = useState<string | null>(null);
  return (
    <PuzzleIdContext.Provider value={[puzzleId, setPuzzleId]}>
      {children}
    </PuzzleIdContext.Provider>
  );
};