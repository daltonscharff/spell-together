"use client";

import { useParams } from "next/navigation";
import { ScoreDisplay } from "./_components/ScoreDisplay";
import { FoundWordList } from "./_components/FoundWordList";
import { useFoundWords } from "@/app/_hooks/useFoundWords";
import ShuffleIcon from "@/public/icons/shuffle.svg";
import Image from "next/image";

export default function Room() {
  const { shortcode } = useParams<{ shortcode: string }>();
  const { foundWords } = useFoundWords();

  return (
    <div className="flex-1 flex flex-col-reverse justify-end md:grid md:grid-cols-2 gap-2">
      <div>
        <div>Hello from ROOM: {shortcode}</div>
        <div className="flex flex-row justify-center gap-3">
          <button className="ring ring-zinc-200 rounded-full px-5 py-2 cursor-pointer active:bg-zinc-200">
            Delete
          </button>
          <button className="ring ring-zinc-200 rounded-full p-2 cursor-pointer active:bg-zinc-200">
            <Image src={ShuffleIcon} alt="shuffle" className="w-6" />
          </button>
          <button className="ring ring-zinc-200 rounded-full px-5 py-2 cursor-pointer active:bg-zinc-200">
            Enter
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-h-160">
        <ScoreDisplay currentScore={1} maxScore={100} />
        <div className="block md:hidden max-h-150">
          <FoundWordList isCollapsible foundWords={foundWords} />
        </div>
        <div className="hidden md:block max-h-full">
          <FoundWordList foundWords={foundWords} />
        </div>
      </div>
    </div>
  );
}
