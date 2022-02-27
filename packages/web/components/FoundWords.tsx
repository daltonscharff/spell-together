import { Record } from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { FC, useState } from "react";
import FoundWord from "./FoundWord";

type Props = {
  foundWords: Record[];
  collapsible?: boolean;
};

const FoundWords: FC<Props> = ({ foundWords, collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  if (collapsible && isCollapsed)
    return (
      <div
        className={`flex-grow flex flex-row border border-zinc-300 rounded-lg p-3 capitalize`}
      >
        <div className={`flex flex-row flex-grow overflow-hidden`}>
          {[...foundWords]
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((record, i) => (
              <div
                className={`px-1 ${record.word?.isPangram && "bg-yellow-300"}`}
                key={i}
              >
                {record.word?.word.toLowerCase()}
              </div>
            ))}
          {foundWords.length === 0 && (
            <div className="text-zinc-300 normal-case">Your words...</div>
          )}
        </div>
        <div className="relative">
          <div className="absolute right-8 bg-gradient-to-l from-white w-4 h-full" />
          <div
            className="px-1 ml-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i className={`bx bxs-chevron-down`}></i>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`flex-grow border border-zinc-300 rounded-lg p-3 h-full`}>
      <div className={`flex`}>
        <div className="flex-grow mb-3">
          This room has found {foundWords.length}{" "}
          {foundWords.length === 1 ? "word" : "words"}
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
      <div className="flex flex-wrap max-h-[500px] overflow-auto">
        {[...foundWords]
          .sort((a, b) => (a.word?.word! > b.word?.word! ? 1 : -1))
          .map((record, i) => (
            <FoundWord key={record.id} record={record} />
          ))}
        {foundWords.length === 0 && (
          <div className="text-zinc-300">Your words...</div>
        )}
      </div>
    </div>
  );
};

export default FoundWords;
