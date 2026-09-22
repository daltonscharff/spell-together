type TitleBarProps = {
  title: string;
  date: Date;
};

export function TitleBar({ title, date }: TitleBarProps) {
  return (
    <div>
      <title>{title}</title>
      <div>{date.toLocaleDateString("en-US", { dateStyle: "long" })}</div>
    </div>
  );
}
