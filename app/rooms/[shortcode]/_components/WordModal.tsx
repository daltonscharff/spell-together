import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import useSWRImmutable from "swr/immutable";

type DictionaryApiResponse = {
  word: string;
  entries: {
    language: {
      code: string;
      name: string;
    };
    partOfSpeech: string;
    pronunciations: {
      type: string;
      text: string;
      tags: string[];
    }[];
    forms: {
      word: string;
      tags: string[];
    }[];
    senses: {
      definition: string;
      examples: string[];
      tags: string[];
      quotes: string[];
      synonyms: string[];
      antonyms: string[];
      subsenses: string[];
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  source: {
    url: string;
    license: {
      name: string;
      url: string;
    };
  };
};

type WordModalProps = {
  word: string;
  pointValue: number;
  isPangram: boolean;
  foundBy: string;
  close: () => void;
};

export function WordModal({
  word,
  pointValue,
  isPangram,
  foundBy,
  close,
}: WordModalProps) {
  const { data, error, isLoading } = useSWRImmutable<DictionaryApiResponse>(
    word ? `https://freedictionaryapi.com/api/v1/entries/en/${word}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  const isOpen = !!word;
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 flex w-screen flex-col justify-center bg-white/80">
        <DialogPanel className="w-full bg-white p-6 mx-auto rounded-2xl shadow-lg max-h-[66%] max-w-xl">
          <DialogTitle
            className={`font-bold italic capitalize text-xl border-b border-zinc-300`}
          >
            <span className={`px-2 ${isPangram && "bg-amber-300"}`}>
              {word}
            </span>
          </DialogTitle>
          <div className="px-2 overflow-y-auto">
            <div className="flex flex-row justify-between pt-3 pb-2">
              <div>Point value: {pointValue}</div>
              <div>Found by: {foundBy}</div>
            </div>
            <div className="flex flex-col gap-2">
              {isLoading && "Loading..."}
              {data?.entries.map((entry, i) => {
                return (
                  <div key={`entry_${i}`}>
                    <span className="italic">{entry.partOfSpeech}</span> -{" "}
                    {entry.senses[0].definition}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
