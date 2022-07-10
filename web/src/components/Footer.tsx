import { usePuzzle } from "../hooks/usePuzzle";

type Props = {
  puzzleId?: string;
};

export const Footer = ({ puzzleId }: Props) => {
  const { puzzle } = usePuzzle(puzzleId);
  return (
    <div className="container text-center text-sm font-light text-zinc-300 border-t border-zinc-200 pt-3 my-6">
      {puzzle?.editor && <p>Puzzle by {puzzle?.editor}.</p>}
      <p>
        This multiplayer version of the{" "}
        <a
          href="https://www.nytimes.com/puzzles/spelling-bee"
          className="underline"
        >
          New York Times Spelling Bee
        </a>{" "}
        was created by{" "}
        <a
          href="https://github.com/daltonscharff/spell-together"
          className="underline"
        >
          Dalton Scharff
        </a>
        .
      </p>
    </div>
  );
};
