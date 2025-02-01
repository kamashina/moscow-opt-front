import Header from "@/src/components/Header/Header";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
