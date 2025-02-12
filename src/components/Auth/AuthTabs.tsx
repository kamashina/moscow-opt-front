import AppText from "@/src/components/AppText/AppText";
import { AUTH_TABS_TRANSLATIONS } from "@/src/constants";
import { Icon } from "@mossoft/ui-kit";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const TABS: Array<{ label: string; value: Tabs }> = [
  { label: "Вход", value: "login" },
  { label: "Регистрация", value: "register" },
];

type Tabs = "register" | "login";

type Props = {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
  step: number;
  setStep: (step: number) => void;
  onClose?: () => void;
};
const AuthTabs = ({ tab, setTab, setStep, step, onClose }: Props) => {
  if (step === 1) {
    return (
      <>
        <div className="flex relative lg:hidden h-6 justify-between flex-row-reverse items-center w-full py-10 px-4 bg-white rounded-b-[25px] lg:rounded-[25px]">
          {step > 1 && (
            <div
              className="bg-primary-light p-2 rounded-full"
              onClick={() => setStep(1)}
            >
              <Icon
                name="arrow-left"
                className="w-6 h-6 text-primary cursor-pointer"
              />
            </div>
          )}

          <div className="absolute left-1/2 transform -translate-x-1/2 w-[210px] h-4">
            <Image src="logo.svg" fill alt="logo" />
          </div>
          {onClose && (
            <div
              className="bg-primary-light p-2 rounded-full"
              onClick={() => onClose()}
            >
              <Icon
                name="close"
                className="w-6 h-6 text-primary cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 p-1 bg-white rounded-[25px]">
          <div className="flex bg-[#F6F6FF] rounded-[25px] relative overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 w-1/2 bg-primary rounded-[25px]"
              animate={{
                x: TABS.findIndex((t) => t.value === tab) * 100 + "%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {TABS.map(({ label, value }) => (
              <div
                key={value}
                className="relative z-10 w-full py-4 text-center cursor-pointer"
                onClick={() => setTab(value)}
              >
                <AppText
                  className={twMerge(
                    "text-lg font-semibold",
                    value === tab ? "text-white" : "text-[#8E8E92]"
                  )}
                >
                  {label}
                </AppText>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (step === 2) {
    return (
      <div className="relative flex justify-between items-center w-full py-5 px-4 bg-white rounded-b-[25px] lg:rounded-[25px]">
        <div
          className="bg-primary-light p-2 rounded-full"
          onClick={() => setStep(1)}
        >
          <Icon
            name="arrow-left"
            className="w-6 h-6 text-primary cursor-pointer"
          />
        </div>
        <AppText className="font-semibold text-lg absolute left-1/2 transform -translate-x-1/2">
          {AUTH_TABS_TRANSLATIONS[tab]}
        </AppText>
        {onClose && (
          <div
            className="bg-primary-light p-2 rounded-full"
            onClick={() => onClose()}
          >
            <Icon
              name="close"
              className="w-6 h-6 text-primary cursor-pointer"
            />
          </div>
        )}
      </div>
    );
  }

  return;
};
export default AuthTabs;
