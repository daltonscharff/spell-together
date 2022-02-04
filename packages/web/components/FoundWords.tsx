import { Record } from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { FC, useState } from "react";

type Props = {
  records: Record[];
  collapsible?: boolean;
};

const FoundWords: FC<Props> = ({ records, collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  if (collapsible && isCollapsed)
    return (
      <div
        className={`flex-grow flex flex-row border rounded-lg p-3 capitalize`}
      >
        <div className={`flex flex-row flex-grow overflow-hidden`}>
          {[...records]
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((record, i) => (
              <div
                className={`px-1 ${record.word?.isPangram && "bg-yellow-300"}`}
                key={i}
              >
                {record.word?.word.toLowerCase()}
              </div>
            ))}
          {records.length === 0 && (
            <div className="text-zinc-300 normal-case">Your words...</div>
          )}
        </div>
        <div className="px-1 ml-2" onClick={() => setIsCollapsed(!isCollapsed)}>
          <i className={`bx bxs-chevron-down`}></i>
        </div>
      </div>
    );

  return (
    <div className={`flex-grow border rounded-lg p-3 capitalize h-full`}>
      <div className={`flex`}>
        <div className="flex-grow normal-case mb-3">
          You have found {records.length}{" "}
          {records.length === 1 ? "word" : "words"}
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
        {[...records]
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          .map((record, i) => (
            <div
              className={`px-1 ${record.word?.isPangram && "bg-yellow-300"}`}
              key={i}
            >
              {record.word?.word.toLowerCase()}
            </div>
          ))}
        {records.length === 0 && (
          <div className="text-zinc-300 normal-case">Your words...</div>
        )}
      </div>
    </div>
  );
};

export default FoundWords;
