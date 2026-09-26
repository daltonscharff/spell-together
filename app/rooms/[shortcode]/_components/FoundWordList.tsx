import { FoundWord } from "@/app/_hooks/useFoundWords";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import pluralize from "pluralize";

type FoundWordListProps = {
  foundWords: FoundWord[];
  isCollapsible?: boolean;
};

export function FoundWordList({
  foundWords,
  isCollapsible,
}: FoundWordListProps) {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsible);

  return (
    <div
      className={`ring ring-gray-200 rounded-sm flex flex-col`}
      onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
    >
      <div className="flex flex-row gap-2 pl-3 pr-0 items-center w-full">
        <div className="flex flex-row gap-1.5 p-2 items-center flex-1 overflow-hidden">
          {isCollapsed && foundWords.length === 0 && (
            <div className="text-gray-200">Your words ...</div>
          )}
          {!isCollapsed && (
            <div>
              You have found {foundWords.length}{" "}
              {pluralize("word", foundWords.length)}
            </div>
          )}
          {isCollapsed &&
            foundWords.map((word) => (
              <div
                key={word.id}
                className={`${word.isPangram && "font-bold"} capitalize`}
              >
                {word.value}
              </div>
            ))}
        </div>
        {isCollapsible && (
          <ChevronDownIcon
            className={`w-5 h-5 mr-3 ${!isCollapsed && "rotate-180"}`}
          />
        )}
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-6 px-5 py-2">
          {foundWords.map((word) => (
            <>
              <div
                key={`${word.id}_expanded`}
                className={`col-span-5 flex flex-row items-center`}
              >
                <div
                  className={`${word.isPangram && "bg-amber-300"} capitalize`}
                >
                  {word.value}
                </div>
                <div className="pl-1.5 text-sm text-gray-500">
                  {word.pointValue}
                </div>
              </div>
              <span className="col-span-1 text-right text-gray-600 text-sm">
                {word.submittedBy}
              </span>
              <div className="col-span-6 text-sm text-gray-500 pb-1 mb-2 border-b border-gray-200">
                <span className="italic pr-2">{word.partOfSpeech}</span>
                {word.definition}
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
