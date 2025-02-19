import { PropsWithChildren } from "react";
import Header from "./_components/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
