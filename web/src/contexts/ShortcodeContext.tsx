import { createContext, FC, PropsWithChildren, useState } from "react";

export const ShortcodeContext = createContext<
  [string | null, (state: string | null) => void]
>([null, () => {}]);

export const ShortcodeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [shortcode, setShortcode] = useState(localStorage.getItem("shortcode"));
  return (
    <ShortcodeContext.Provider value={[shortcode, setShortcode]}>
      {children}
    </ShortcodeContext.Provider>
  );
};
