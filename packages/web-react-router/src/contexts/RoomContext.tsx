import { createContext, PropsWithChildren, useContext, useState } from "react";

export type RoomContextProps = PropsWithChildren<{}>;

export type RoomType = {
  shortcode: string | null;
  name: string | null;
};

const nullRoom: RoomType = {
  shortcode: null,
  name: null,
};

export const RoomContext = createContext<[RoomType, (state: RoomType) => void]>(
  [nullRoom, () => {}]
);

export const RoomProvider = (props: RoomContextProps) => {
  const [state, setState] = useState<RoomType>({
    ...nullRoom,
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <RoomContext.Provider value={[state, setState]}>
      {props.children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const [state, setState] = useContext(RoomContext);

  function setShortcode(shortcode: string) {
    localStorage.setItem("shortcode", shortcode);
    setState({ ...state, shortcode });
  }

  return {
    ...state,
    setShortcode,
  };
};
