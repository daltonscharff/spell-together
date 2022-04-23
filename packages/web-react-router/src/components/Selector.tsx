import styled from "styled-components";

type Props = {
  items: {
    value: string;
    onClick?: () => void;
  }[];
  selectedIndex?: number;
};

const Container = styled.div`
  display: flex;
`;

const Tab = styled.div`
  font-weight: ${(props: { selected?: boolean }) =>
    props.selected ? "bold" : "normal"};
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
`;

export function Selector({ items, selectedIndex = 0 }: Props) {
  return (
    <Container>
      {items.map((item, i) => (
        <Tab
          key={`${i}${item}`}
          onClick={item.onClick}
          selected={i === selectedIndex}
        >
          {item.value}
        </Tab>
      ))}
    </Container>
  );
}
