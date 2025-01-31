import Header from "@/src/components/Header/Header";
import React, { FC, PropsWithChildren } from "react";

type Props = {};

const Layout: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
