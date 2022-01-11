import { FC } from "react";

type Props = {
  words: string[];
};

const FoundWords: FC<Props> = ({ words }) => {
  return (
    <div className="flex flex-row flex-wrap font-Roboto border rounded-lg p-3 my-4 capitalize">
      {words.sort().map((word) => (
        <div className="px-2" key={word}>
          {word.toLowerCase()}
        </div>
      ))}
    </div>
  );
};

export default FoundWords;
