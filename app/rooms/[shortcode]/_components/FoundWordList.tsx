import { FoundWord } from "@/app/_hooks/useFoundWords";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import pluralize from "pluralize";
import { WordModal } from "./WordModal";

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
  const [selectedWord, setSelectedWord] = useState<FoundWord | null>(null);

  return (
    <div
      className={`ring ring-zinc-300 rounded-sm flex flex-col max-h-[inherit] md:h-full`}
    >
      {/* Top Bar */}
      <div
        className={`flex flex-row gap-2 pl-3 pr-0 items-center w-full ${isCollapsible && "cursor-pointer"} ${!isCollapsed && "border-b border-zinc-300"}`}
        onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
      >
        <div className="flex flex-row gap-1.5 p-2 items-center flex-1 overflow-hidden">
          {isCollapsed && foundWords.length === 0 && (
            <div className="text-zinc-300">Your words ...</div>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 justify-start px-5 py-2 overflow-y-auto gap-x-3 gap-y-2">
          {foundWords
            .sort((a, b) => a.value.charCodeAt(0) - b.value.charCodeAt(0))
            .map((word) => (
              <button
                key={`${word.id}_expanded`}
                className={`flex justify-between items-center capitalize pl-1 pr-2 pt-1 pb-[2px] cursor-pointer hover:bg-zinc-100/75 text-left border-b border-zinc-300`}
                onClick={() => setSelectedWord(word)}
              >
                <span
                  className={`px-1 rounded-xs ${word.isPangram && "bg-amber-300/75"}`}
                >
                  {word.value}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stringToColor(word.submittedBy) }}
                />
              </button>
            ))}
        </div>
      )}
      <WordModal
        word={selectedWord?.value ?? ""}
        isPangram={selectedWord?.isPangram ?? false}
        pointValue={selectedWord?.pointValue ?? 0}
        foundBy={selectedWord?.submittedBy ?? ""}
        close={() => setSelectedWord(null)}
      />
    </div>
  );
}
