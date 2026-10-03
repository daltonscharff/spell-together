import { PuzzleSelector } from "./PuzzleSelector";

type TitleBarProps = {
  title: string;
};

export function TitleBar({ title }: TitleBarProps) {
  return (
    <div className="flex flex-row flex-wrap items-baseline gap-x-3">
      <div className="text-3xl font-bold">{title}</div>
      <PuzzleSelector />
    </div>
  );
}
