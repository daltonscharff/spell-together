import { createContext, FC, useState } from "react";

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

export const UserProvider: FC = ({ children }) => {
  const [state, setState] = useState<UserType>({
    ...defaultUser,
    username: localStorage.getItem("username"),
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
