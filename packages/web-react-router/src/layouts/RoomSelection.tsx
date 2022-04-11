import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Selector } from "../components/Selector";

type Props = PropsWithChildren<{
  selectedIndex?: number;
}>;

export function RoomSelection({ selectedIndex = 0, children }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Selector
        items={[
          {
            value: "Join",
            onClick: () => navigate("/rooms/join"),
          },
          {
            value: "Create",
            onClick: () => navigate("/rooms/create"),
          },
        ]}
        selectedIndex={selectedIndex}
      />
      {children}
    </>
  );
}
