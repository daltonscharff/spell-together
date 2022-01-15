import { FC } from "react";

type Props = {
  words: string[];
};

const FoundWords: FC<Props> = ({ words }) => {
  return (
    <div className="flex-grow flex flex-row sm:flex-col border rounded-lg p-3 capitalize">
      <div className="flex flex-row flex-grow overflow-hidden">
        {words.map((word, i) => (
          <div className="px-1" key={i}>
            {word.toLowerCase()}
          </div>
        ))}
      </div>
      <div className="px-1 ml-2">
        <i className="bx bxs-chevron-down"></i>
      </div>
    </div>
  );
};

export default FoundWords;
