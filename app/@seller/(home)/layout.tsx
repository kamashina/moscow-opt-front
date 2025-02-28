import { PropsWithChildren } from "react";
import Header from "./_components/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Header />
      <div className="w-[calc(100%-80px)] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
