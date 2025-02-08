import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-row m-auto h-screen">
          <div className="relative h-[750px] my-auto w-[780px]">
            <Image src="/images/auth.png" fill alt="auth" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
