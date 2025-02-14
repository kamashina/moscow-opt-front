import AppText from "@/src/components/AppText/AppText";
import ClientIcon from "@/src/components/ClientIcon/ClientIcon";
import { Wrapper } from "@mossoft/ui-kit";
import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-white rounded-[25px] mt-2 lg:max-w-[1440px] mx-auto p-7">
      <div className="flex flex-col gap-2 w-[300px]">
        <div className="relative w-[300px] h-10">
          <Image src="logo.svg" fill alt="logo" />
        </div>
        <AppText>
          Описание описание описание описание описание описание описание
          описание описание
        </AppText>
      </div>

      <div className="flex flex-row gap-2">
        <div className="bg-primary rounded-full p-2">
          <ClientIcon name="whatsapp" className="h-5 w-5 !text-white" />
        </div>
        <div className="bg-primary rounded-full p-2">
          <ClientIcon name="telegram" className="h-5 w-5 !text-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
