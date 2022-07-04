import { FC } from "react";
type Props = {
  children: JSX.Element[];
  divider?: JSX.Element;
};

export const DividedList: FC<Props> = ({
  divider = <div className="border-black border-t" />,
  children,
}) => {
  return (
    <>
      {children.map((element, i, array) => (
        <>
          <div className="p-4">{element}</div>
          {i < array.length - 1 && divider}
        </>
      ))}
    </>
  );
};
