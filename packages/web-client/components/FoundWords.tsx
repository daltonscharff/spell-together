import { FC } from "react";

type Props = {
  words: string[];
};

const FoundWords: FC<Props> = ({ words }) => {
  return (
    <div className="flex-grow flex flex-row sm:flex-col flex-wrap border rounded-lg p-3 capitalize">
      {words.sort().map((word, i) => (
        <div className="px-1" key={i}>
          {word.toLowerCase()}
        </div>
      ))}
    </div>
  );
};

export default FoundWords;
