import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Layout: FC<Props> = ({ className, children }) => {
  return (
    <main className={`container mx-auto px-6 py-4 ${className}`}>
      {children}
    </main>
  );
};

export default Layout;
