import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

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
  const isOpen = !!word;
  const partOfSpeech = "noun";
  const definition = "This is the definition";
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 flex w-screen flex-col justify-end bg-zinc-100/50">
        <DialogPanel className="w-full bg-white p-6 mx-auto rounded-t-2xl border-t border-l border-r border-zinc-300 max-h-[66%] overflow-y-auto max-w-xl">
          <DialogTitle
            className={`font-bold italic capitalize text-xl border-b border-zinc-300`}
          >
            <span className={`px-2 ${isPangram && "bg-amber-300"}`}>
              {word}
            </span>
          </DialogTitle>
          <Description className="px-2 py-2">
            <div className="flex flex-row justify-between">
              <div>Point value: {pointValue}</div>
              <div>Found by: {foundBy}</div>
            </div>
            <div>
              <span className="italic">{partOfSpeech}</span> - {definition}
            </div>
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
