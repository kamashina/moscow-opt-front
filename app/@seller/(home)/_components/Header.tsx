import ClientIcon from "@/src/components/ClientIcon/ClientIcon";
import CompanyIcon from "@/src/components/CompanyIcon/CompanyIcon";
import Image from "next/image";
import Link from "next/link";
import TooltipNav from "./TooltipNav";

type Props = {};

const Header = async ({}: Props) => {
  return (
    <div className="relative bg-white z-10 top-0 rounded-b-[25px] w-screen lg:px-2 backdrop-blur-[1px] shadow-lg">
      <div className="h-20 flex flex-row items-center lg:max-w-[1440px] mx-auto">
        <Link
          href="/"
          title="logo"
          className="relative w-[210px] h-6 mr-[35px]"
        >
          <Image src="/logo.svg" fill alt="logo" />
        </Link>

        <div className="flex-row justify-between w-full items-center flex">
          <TooltipNav />

          <div className="flex flex-row gap-2 items-center">
            <div
              title="Оповещения"
              className="group cursor-pointer rounded-full bg-primary-light p-3 hover:bg-primary active:opacity-70"
            >
              <ClientIcon
                name="bell"
                className="!text-primary group-hover:!text-white w-5 h-5"
              />
            </div>
            <div
              title="Поддержка"
              className="group cursor-pointer rounded-full bg-primary-light p-3 hover:bg-primary active:opacity-70"
            >
              <ClientIcon
                name="support"
                className="!text-primary group-hover:!text-white w-5 h-5"
              />
            </div>
            <CompanyIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
