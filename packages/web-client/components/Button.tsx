import { FC, ReactChild, ReactChildren } from "react";

type Props = {
  children: ReactChildren | ReactChild;
};

const Button: FC<Props> = ({ children }) => {
  return (
    <button className="bg-emerald-600 text-white font-bold w-full py-2 rounded-full">
      {children}
    </button>
  );
};

export default Button;
