import { useCorrectGuesses } from "../hooks/useCorrectGuesses";
import { Fragment } from "react";

const partOfSpeechAbbreviation: Record<string, string> = {
  noun: "n.",
  pronoun: "pron.",
  verb: "v.",
  adjective: "adj.",
  adverb: "adv.",
  preposition: "prep.",
  conjunction: "conj.",
  interjection: "interj.",
};

export const CorrectGuessList = () => {
  const { filteredGuesses } = useCorrectGuesses();
  return (
    <>
      {filteredGuesses.length === 0 && (
        <div className="text-zinc-400 italic font-light p-2">
          No words found
        </div>
      )}
      {filteredGuesses.map((guess, i, array) => (
        <Fragment key={guess.word_id}>
          <div className="px-2">
            <div className="flex flex-row justify-between">
              <div
                className={`capitalize font-semibold ${
                  guess.is_pangram &&
                  "relative bg-yellow-300 px-1 -left-1 rounded-sm"
                }`}
              >
                {guess.word}
                <span className="font-light align-top text-[.65rem] ml-1 select-none text-zinc-800">
                  {guess.point_value}
                </span>
              </div>
              <div className="font-light">{guess.username}</div>
            </div>
            <div className="italic font-light">
              {guess.part_of_speech && (
                <span>{partOfSpeechAbbreviation[guess.part_of_speech]} </span>
              )}
              <span>{guess.definition}</span>
            </div>
          </div>
          {i < array.length - 1 && (
            <div className="border-t border-black my-2" />
          )}
        </Fragment>
      ))}
    </>
  );
};
