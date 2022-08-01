import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {}

export const CtaButton: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`px-8 py-3 bg-primary border border-primary rounded-sm uppercase font-bold ${className}`}
    >
      {children}
    </button>
  );
};
