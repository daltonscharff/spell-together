import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="flex flex-col gap-y-8 min-h-screen">
      <Header titleOnly />
      <div className="container flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
