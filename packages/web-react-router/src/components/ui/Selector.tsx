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
      {items.map((item, i) => {
        return i === selectedIndex ? (
          <b key={`${i}${item}`} onClick={item.onClick}>
            {item.value}
          </b>
        ) : (
          <div key={`${i}${item}`} onClick={item.onClick}>
            {item.value}
          </div>
        );
      })}
    </div>
  );
}
