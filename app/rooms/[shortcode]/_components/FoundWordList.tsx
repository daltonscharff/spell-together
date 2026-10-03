import { FoundWord } from "@/app/_hooks/useFoundWords";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import pluralize from "pluralize";
import React from "react";

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
      className={`ring ring-zinc-200 rounded-sm flex flex-col max-h-[inherit] md:h-full`}
    >
      {/* Top Bar */}
      <div
        className={`flex flex-row gap-2 pl-3 pr-0 items-center w-full ${isCollapsible && "cursor-pointer"} ${!isCollapsed && "border-b border-zinc-200"}`}
        onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex flex-row gap-1.5 p-2 items-center flex-1 overflow-hidden">
          {isCollapsed && foundWords.length === 0 && (
            <div className="text-zinc-200">Your words ...</div>
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
                key={`${word.id}_collapsed`}
                className={`${word.isPangram && "font-bold"} capitalize`}
              >
                {word.value}
              </div>
            ))}
        </div>

        {/* Drop Down Arrow */}
        {isCollapsible && (
          <div className="relative">
            {isCollapsed && (
              <span className="absolute w-7 h-5 left-[-24px] bg-linear-to-r from-[#FFF0] to-[#FFF] to-75%" />
            )}
            <ChevronDownIcon
              className={`w-5 h-5 mr-3 ${!isCollapsed && "rotate-180"}`}
            />
          </div>
        )}
      </div>

      {/* Expanded Word List */}
      {!isCollapsed && (
        <div className="grid grid-cols-6 px-5 py-2 overflow-y-auto">
          {foundWords.map((word) => (
            <React.Fragment key={`${word.id}_expanded`}>
              <div className={`col-span-5 flex flex-row items-center`}>
                <div
                  className={`${word.isPangram && "bg-amber-300"} capitalize`}
                >
                  {word.value}
                </div>
                <div className="pl-1.5 text-sm text-zinc-500">
                  {word.pointValue}
                </div>
              </div>
              <span className="col-span-1 text-right text-zinc-600 text-sm">
                {word.submittedBy}
              </span>
              <div className="col-span-6 text-sm text-zinc-500 pb-1 border-b border-zinc-200">
                <span className="italic pr-2">{word.partOfSpeech}</span>
                {word.definition}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
