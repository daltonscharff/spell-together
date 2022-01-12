import { FC } from "react";

type Props = {
  words: string[];
};

const FoundWords: FC<Props> = ({ words }) => {
  return (
    <div className="flex flex-row flex-wrap border rounded-lg p-3 my-4 capitalize">
      {words.sort().map((word, i) => (
        <div className="px-2" key={i}>
          {word.toLowerCase()}
        </div>
      ))}
    </div>
  );
};

export default FoundWords;
