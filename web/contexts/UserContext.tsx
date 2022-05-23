import { createContext, FC, useState } from "react";

export type User = {
  username: string | null;
  shortcode: string | null;
};

const defaultUser: User = {
  username: null,
  shortcode: null,
};

export const UserContext = createContext<[User, (state: User) => void]>([
  defaultUser,
  () => {},
]);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    ...defaultUser,
    username: localStorage.getItem("username"),
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
