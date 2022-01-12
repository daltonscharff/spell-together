import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Layout: FC<Props> = ({ className, children }) => {
  return (
    <main className={`sm:container mx-auto px-6 my-4 ${className}`}>
      {children}
    </main>
  );
};

export default Layout;
