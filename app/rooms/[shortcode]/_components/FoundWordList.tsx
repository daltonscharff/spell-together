import { FoundWord } from "@/app/_hooks/useFoundWords";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import pluralize from "pluralize";
import React from "react";

type FoundWordListProps = {
  foundWords: FoundWord[];
  isCollapsible?: boolean;
};

function stringToColor(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16);
  }
  return color;
}

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
        <div className="flex flex-row flex-wrap justify-start px-5 py-2 overflow-y-auto gap-x-3 gap-y-2">
          {foundWords
            .sort((a, b) => a.value.charCodeAt(0) - b.value.charCodeAt(0))
            .map((word) => (
              <button
                key={`${word.id}_expanded`}
                className={`capitalize px-2 pt-1 pb-[2px] rounded-sm border-t border-b border-l border-r border-l-zinc-100/75 border-t-zinc-100/75 cursor-pointer hover:bg-zinc-100/50 text-left ${word.isPangram && "bg-amber-300/75 hover:bg-amber-300/50! border-l-0 border-t-0"}`}
                style={{
                  borderBottomColor: stringToColor(word.submittedBy),
                  borderRightColor: stringToColor(word.submittedBy),
                }}
              >
                {word.value}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
