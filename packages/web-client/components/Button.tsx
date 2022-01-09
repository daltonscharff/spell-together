import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

const Button: FC<Props> = ({ className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 px-6 rounded-full border ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
