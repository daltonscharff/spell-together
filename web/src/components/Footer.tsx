import { usePuzzle } from "../hooks/usePuzzle";

export const Footer = () => {
  const { puzzle } = usePuzzle();
  return (
    <div className="container text-center text-sm font-light text-zinc-300 border-t border-zinc-200 pt-3 my-4">
      {puzzle?.editor && <p>Puzzle by {puzzle?.editor}.</p>}
      <p>
        This multiplayer version of{" "}
        <a
          href="https://www.nytimes.com/puzzles/spelling-bee"
          className="hover:underline"
        >
          The New York Times Spelling Bee
        </a>{" "}
        was created by{" "}
        <a
          href="https://github.com/daltonscharff/spell-together"
          className="hover:underline"
        >
          Dalton Scharff
        </a>
        .
      </p>
    </div>
  );
};
