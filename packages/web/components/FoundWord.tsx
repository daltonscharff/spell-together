import {
  Record,
  Word,
} from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { FC, useState } from "react";

type Props = {
  record: Record;
};

const expandedContent = (word: Word) => {
  return (
    <div className="text-sm py-1">
      <span className="italic">{word.partOfSpeech}: </span>
      <span>{word.definition}</span>
    </div>
  );
};

const FoundWord: FC<Props> = ({ record }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={"border shadow-sm border-zinc-300 px-2 rounded-md w-full"}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-end pb-1">
        <div className="flex-grow">{record.word?.word}</div>
        <div className="font-light text-sm">{record.username}</div>
      </div>
      {isExpanded && expandedContent(record.word!)}
    </div>
  );
};

export default FoundWord;
