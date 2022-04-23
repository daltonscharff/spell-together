import { createContext, PropsWithChildren, useState } from "react";

export type StoreContextProps = PropsWithChildren<{}>;

export type StoreType = {
  username: string | null;
  shortcode: string | null;
};

const defaultUser: StoreType = {
  username: null,
  shortcode: null,
};

export const StoreContext = createContext<
  [StoreType, (state: StoreType) => void]
>([defaultUser, () => {}]);

export const StoreProvider = (props: StoreContextProps) => {
  const [state, setState] = useState<StoreType>({
    ...defaultUser,
    username: localStorage.getItem("username"),
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <StoreContext.Provider value={[state, setState]}>
      {props.children}
    </StoreContext.Provider>
  );
};
