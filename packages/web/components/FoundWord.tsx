import { Record as RecordType } from "@daltonscharff/spelling-bee-shared/lib/interfaces";
import { FC } from "react";

type Props = {
  record: RecordType;
  isExpanded?: boolean;
};

const abbreviationMapping: Record<string, string> = {
  adjective: "adj.",
  adverb: "adv.",
  conjunction: "conj.",
  interjection: "interj.",
  noun: "n.",
  preposition: "prep.",
  pronoun: "pron.",
  verb: "v.",
};

const FoundWord: FC<Props> = ({ record, isExpanded = true }) => {
  return (
    <div className={"border-b border-zinc-100 px-2 w-full"}>
      <div className="flex items-end">
        <div className={`flex-grow`}>
          <span className={`${record.word?.isPangram && "bg-yellow-300"}`}>
            {record.word?.word}
          </span>
        </div>
        <div className="font-light">{record.username}</div>
      </div>
      {record.word?.partOfSpeech && record.word?.definition && isExpanded && (
        <div className="text-sm pb-1 font-light">
          <span className="pr-1">
            {abbreviationMapping[record.word.partOfSpeech]},
          </span>
          <span>{record.word.definition}</span>
        </div>
      )}
    </div>
  );
};

export default FoundWord;
