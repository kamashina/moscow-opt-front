import AppText from "@/src/components/AppText/AppText";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const TABS: Array<{ label: string; value: Tabs }> = [
  { label: "Вход", value: "login" },
  { label: "Регистрация", value: "register" },
];

type Tabs = "register" | "login";

type Props = {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
};
const AuthTabs = ({ tab, setTab }: Props) => (
  <div className="flex bg-[#F6F6FF] rounded-[25px] relative overflow-hidden">
    <motion.div
      className="absolute top-0 bottom-0 w-1/2 bg-primary rounded-[25px]"
      animate={{ x: TABS.findIndex((t) => t.value === tab) * 100 + "%" }}
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
);
export default AuthTabs;
