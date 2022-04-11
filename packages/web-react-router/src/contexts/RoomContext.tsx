import { createContext, PropsWithChildren, useState } from "react";

export type RoomContextProps = PropsWithChildren<{}>;

export const RoomContext = createContext([{}, () => {}]);

export const RoomProvider = (props: RoomContextProps) => {
  const [state, setState] = useState({});
  return (
    <RoomContext.Provider value={[state, setState]}>
      {props.children}
    </RoomContext.Provider>
  );
};
