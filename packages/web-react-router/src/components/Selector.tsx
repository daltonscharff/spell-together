type Props = {
  items: {
    value: string;
    onClick?: () => void;
  }[];
  selectedIndex?: number;
};

export function Selector({ items, selectedIndex = 0 }: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <div
          key={`${i}${item}`}
          onClick={item.onClick}
          style={i === selectedIndex ? { fontWeight: "bold" } : {}}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
}
