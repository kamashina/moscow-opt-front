import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="max-w-[1440px] mx-auto">{children}</div>;
};

export default Layout;
