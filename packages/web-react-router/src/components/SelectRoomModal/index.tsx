import { useState } from "react";
import { ModalWrapper } from "../ui/ModalWrapper";
import { Selector } from "../ui/Selector";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";

const selectableItems = ["Join", "Create"];

export function SelectRoomModal() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ModalWrapper>
      SelectRoomModal
      <Selector
        items={selectableItems.map((item, i) => ({
          value: item,
          onClick: () => setSelectedIndex(i),
        }))}
        selectedIndex={selectedIndex}
      />
      {selectedIndex === 0 ? <JoinRoom /> : <CreateRoom />}
    </ModalWrapper>
  );
}
