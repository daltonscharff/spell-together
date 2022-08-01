import { FC, PropsWithChildren } from "react";

export const CtaButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className="px-8 py-3 bg-primary border border-primary rounded-sm uppercase font-bold">
      {children}
    </button>
  );
};
