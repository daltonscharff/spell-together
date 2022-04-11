import { createContext, PropsWithChildren, useContext, useState } from "react";

export type UserContextProps = PropsWithChildren<{}>;

export type UserType = {
  username: string | null;
};

export const UserContext = createContext<[UserType, (state: UserType) => void]>(
  [{ username: null }, () => {}]
);

export const UserProvider = (props: UserContextProps) => {
  const [state, setState] = useState<UserType>({
    username: localStorage.getItem("username") || null,
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const [state, setState] = useContext(UserContext);

  function setUsername(username: string) {
    localStorage.setItem("username", username);
    setState({ ...state, username });
  }

  return {
    ...state,
    setUsername,
  };
};
