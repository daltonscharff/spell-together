type Props = {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
};

export function Selector({ items, selectedIndex, setSelectedIndex }: Props) {
  return (
    <div>
      {items.map((item, i) => {
        return i === selectedIndex ? (
          <b onClick={() => setSelectedIndex(i)}>{item}</b>
        ) : (
          <div onClick={() => setSelectedIndex(i)}>{item}</div>
        );
      })}
    </div>
  );
}
