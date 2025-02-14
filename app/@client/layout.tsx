import { FC, PropsWithChildren, ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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
