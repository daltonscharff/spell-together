import { useState } from "react";
import { CreateRoom } from "../components/CreateRoom";
import { JoinRoom } from "../components/JoinRoom";
import { Selector } from "../components/Selector";

const pages = [
  {
    name: "Join",
    page: <JoinRoom />,
  },
  {
    name: "Create",
    page: <CreateRoom />,
  },
];

export function Home() {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  return (
    <>
      <Selector
        items={pages.map((page) => page.name)}
        selectedIndex={selectedPageIndex}
        setSelectedIndex={setSelectedPageIndex}
      />
      {pages[selectedPageIndex].page}
    </>
  );
}
