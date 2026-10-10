import { PuzzleSelector } from "./PuzzleSelector";

type TitleBarProps = {
  title: string;
};

export function TitleBar({ title }: TitleBarProps) {
  return (
    <div className="flex flex-row flex-wrap items-baseline gap-x-3 max-w-6xl w-full">
      <div className="text-3xl font-bold">{title}</div>
      <PuzzleSelector />
    </div>
  );
}
