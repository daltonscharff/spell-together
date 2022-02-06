import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  onClick?: () => void;
}>;

const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 px-6 rounded-full border border-zinc-300 xs:w-24`}
    >
      {children}
    </button>
  );
};

export default Button;
