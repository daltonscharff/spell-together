import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

type Props = {
  items: {
    value: string;
    onClick?: () => void;
  }[];
  selectedIndex?: number;
  className?: string;
};

const Container = styled(Box)`
  display: flex;
  border: 1px solid lightgrey;
  background: #eee;
  border-radius: 5px;
  column-gap: 2px;
`;

const Tab = styled(Box)`
  color: ${(props: { selected?: boolean }) =>
    props.selected ? "black" : "grey"};
  background: ${(props: { selected?: boolean }) =>
    props.selected ? "white" : "#eee;"};
  box-shadow: ${(props: { selected?: boolean }) =>
    props.selected ? "0px 0px 2px 0px #ddd;" : "none"};
  flex-grow: 1;
  width: 0;
  text-align: center;
  cursor: pointer;
  padding: 0.25em 1em;
  border-radius: 5px;
`;

export function Selector({ items, selectedIndex = 0, className }: Props) {
  return (
    <Container className={className}>
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
