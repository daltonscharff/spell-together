import { FC, useState } from "react";
import { FoundWord } from "@daltonscharff/spelling-bee-core";

type Props = {
  words: FoundWord[];
  collapsible?: boolean;
};

const FoundWords: FC<Props> = ({ words, collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (collapsible && isCollapsed)
    return (
      <div
        className={`flex-grow flex flex-row border rounded-lg p-3 capitalize`}
      >
        <div className={`flex flex-row flex-grow overflow-hidden`}>
          {[...words]
            .sort((a, b) => (a.foundAt < b.foundAt ? 1 : -1))
            .map((word, i) => (
              <div className="px-1" key={i}>
                {word.word.toLowerCase()}
              </div>
            ))}
        </div>
        <div className="px-1 ml-2" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bx bxs-chevron-down`}></i>
        </div>
      </div>
    );

  return (
    <div className={`flex-grow border rounded-lg p-3 capitalize`}>
      <div className={`flex`}>
        <div className="flex-grow normal-case mb-3">
          You have found {words.length} {words.length === 1 ? "word" : "words"}
        </div>
        {collapsible && (
          <div
            className="px-1 ml-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`bx bxs-chevron-up`}></i>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[...words]
          .sort((a, b) => (a.word > b.word ? 1 : -1))
          .map((word, i) => (
            <div key={i} className="border-b my-1">
              {word.word.toLowerCase()}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FoundWords;
