import { PropsWithChildren } from "react";
import Header from "./_components/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
