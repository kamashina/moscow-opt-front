import { FC, PropsWithChildren, ReactNode } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

type Props = {
  modal: ReactNode;
};

const Layout: FC<PropsWithChildren<Props>> = async ({ children, modal }) => {
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] mx-auto">{children}</div>
      {modal}
      <Footer />
    </div>
  );
};

export default Layout;
