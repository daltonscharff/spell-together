import { createContext, FC, PropsWithChildren, useState } from "react";

export const UsernameContext = createContext<
  [string | null, (state: string | null) => void]
>([null, () => {}]);

export const UsernameProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      {children}
    </UsernameContext.Provider>
  );
};
