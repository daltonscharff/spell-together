import { createContext, PropsWithChildren, useState } from "react";

export type UserContextProps = PropsWithChildren<{}>;

export type UserType = {
  username: string | null;
  shortcode: string | null;
};

const defaultUser: UserType = {
  username: null,
  shortcode: null,
};

export const UserContext = createContext<[UserType, (state: UserType) => void]>(
  [defaultUser, () => {}]
);

export const UserProvider = (props: UserContextProps) => {
  const [state, setState] = useState<UserType>({
    ...defaultUser,
    username: localStorage.getItem("username"),
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
