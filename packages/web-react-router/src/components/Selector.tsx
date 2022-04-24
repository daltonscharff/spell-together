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
  display: grid;
  grid-template-columns: ${(props: { length: number }) => {
    let columns = "";
    for (let i = 0; i < props.length; i++) {
      columns += "auto ";
    }
    return columns + ";";
  }}
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
  text-align: center;
  cursor: pointer;
  padding: 0.25em 1em;
  border-radius: 5px;
`;

export function Selector({ items, selectedIndex = 0, className }: Props) {
  return (
    <Container className={className} length={items.length}>
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
