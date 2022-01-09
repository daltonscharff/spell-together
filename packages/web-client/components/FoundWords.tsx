import { FC } from "react";

type Props = {
  words: string[];
};

const FoundWords: FC<Props> = ({ words }) => {
  return (
    <div className="border rounded-lg p-3">
      {words.sort().map((word) => (
        <span className="px-2" key={word}>
          {word}
        </span>
      ))}
    </div>
  );
};

export default FoundWords;
