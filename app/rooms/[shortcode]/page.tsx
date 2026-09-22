"use client";

import { useParams } from "next/navigation";
import { ScoreDisplay } from "./_components/ScoreDisplay";

export default function Room() {
  const { shortcode } = useParams<{ shortcode: string }>();

  return (
    <div>
      Hello from ROOM: {shortcode}
      <ScoreDisplay currentScore={49} maxScore={100} />
    </div>
  );
}
