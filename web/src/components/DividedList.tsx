import { FC, Fragment } from "react";
type Props = {
  children: JSX.Element[];
  overflowIndex?: number;
  divider?: JSX.Element;
};

export const DividedList: FC<Props> = ({
  divider = <div className="border-black border-t" />,
  overflowIndex,
  children,
}) => {
  return (
    <>
      {children.map((element, i, array) => (
        <Fragment key={i}>
          <div className={`p-4 ${overflowIndex === i && "overflow-y-auto"}`}>
            {element}
          </div>
          {i < array.length - 1 && divider}
        </Fragment>
      ))}
    </>
  );
};
