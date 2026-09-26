type TitleBarProps = {
  title: string;
  date: Date;
};

export function TitleBar({ title, date }: TitleBarProps) {
  console.log(title);
  return (
    <div className="flex flex-row flex-wrap items-baseline gap-x-3">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-lg font-light">
        {date.toLocaleDateString("en-US", { dateStyle: "long" })}
      </div>
    </div>
  );
}
