import { useState } from "react";
import { CreateRoom } from "../components/CreateRoom";
import { JoinRoom } from "../components/JoinRoom";
import { Selector } from "../components/Selector";
import useStore from "../store";

export function Home() {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [createdShortcode, setCreatedShortcode] = useState<string>("");

  const pages = [
    {
      name: "Join",
      page: <JoinRoom />,
    },
    {
      name: "Create",
      page: (
        <CreateRoom
          createdShortcode={createdShortcode}
          setCreatedShortcode={setCreatedShortcode}
        />
      ),
    },
  ];

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
