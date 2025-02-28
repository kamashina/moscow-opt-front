import AppText from "@/src/components/AppText/AppText";
import { useAuthServiceLogout } from "@/src/openapi/queries";
import { setToken } from "@/src/utils/setToken";
import { Icon } from "@mossoft/ui-kit";
import { useRouter } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";

type Props = {
  label?: string;
};

const CompanyWrapper: FC<PropsWithChildren<Props>> = ({ children, label }) => {
  const router = useRouter();
  const { mutateAsync: logout } = useAuthServiceLogout();
  const onLogout = async () => {
    try {
      const res = await logout();
      setToken("");
      router.push("/auth");
    } catch (e) {}
  };

  return (
    <div className="flex flex-col gap-2 w-full mx-auto lg:my-auto max-w-[400px]">
      <div className="relative flex justify-between items-center w-full py-5 px-4 bg-white rounded-b-[25px] lg:rounded-[25px]">
        <div className="bg-primary-light p-2 rounded-full" onClick={onLogout}>
          <Icon
            name="arrow-left"
            className="w-6 h-6 text-primary cursor-pointer"
          />
        </div>
        <AppText className="font-semibold text-lg lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2  mr-8 lg:mr-0">
          {label}
        </AppText>
      </div>
      <div className="flex flex-col gap-3 py-4 px-5 max-h-[740px]  bg-white rounded-[25px]">
        {children}
      </div>
    </div>
  );
};

export default CompanyWrapper;
