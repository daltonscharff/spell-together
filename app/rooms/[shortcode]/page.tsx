"use client";

import { useParams } from "next/navigation";
import { ScoreDisplay } from "./_components/ScoreDisplay";
import { FoundWordList } from "./_components/FoundWordList";
import { useFoundWords } from "@/app/_hooks/useFoundWords";

export default function Room() {
  const { shortcode } = useParams<{ shortcode: string }>();
  const { foundWords } = useFoundWords();

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div>Hello from ROOM: {shortcode}</div>
      <ScoreDisplay currentScore={1} maxScore={100} />
      <FoundWordList isCollapsible foundWords={foundWords} />
    </div>
  );
}
