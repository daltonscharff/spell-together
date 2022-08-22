import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { SortedNameList } from "./SortedNameList";

type Props = {
  expanded?: boolean;
};

export const FoundWordDisplay = ({ expanded }: Props) => {
  const { correctGuesses } = useCorrectGuesses();

  return (
    <>
      <div className="font-semibold">
        Found Words: {correctGuesses?.length || 0}
      </div>
      {expanded && <SortedNameList sortBy="words" />}
    </>
  );
};
