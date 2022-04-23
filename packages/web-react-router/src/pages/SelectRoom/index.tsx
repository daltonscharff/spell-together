import { useState } from "react";
import styled from "styled-components";
import { Selector } from "../../components/Selector";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";

const selectableItems = ["Join", "Create"];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export function SelectRoom() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Container>
      <Selector
        items={selectableItems.map((item, i) => ({
          value: item,
          onClick: () => setSelectedIndex(i),
        }))}
        selectedIndex={selectedIndex}
      />
      {selectedIndex === 0 ? <JoinRoom /> : <CreateRoom />}
    </Container>
  );
}
