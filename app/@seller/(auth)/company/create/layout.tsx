import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-row m-auto h-screen">
        <div className="hidden lg:flex relative h-[750px] my-auto w-[780px]">
          <Image src="/images/auth.png" sizes="100%" priority fill alt="auth" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
