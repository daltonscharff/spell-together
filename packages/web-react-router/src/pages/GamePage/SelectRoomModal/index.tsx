import { useState } from "react";
import styled from "styled-components";
import { ModalWrapper } from "../../../components/ModalWrapper";
import { Selector } from "../../../components/Selector";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";

const selectableItems = ["Join", "Create"];

const Container = styled.div`
  max-width: 500px;
`;

export function SelectRoomModal() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ModalWrapper>
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
    </ModalWrapper>
  );
}
