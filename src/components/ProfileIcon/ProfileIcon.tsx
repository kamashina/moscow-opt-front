"use client";
import { getQueryClient } from "@/src/api/api";
import { getInitials } from "@/src/constants";
import {
  useAuthServiceLogout,
  useUsersServiceGetMe,
  useUsersServiceGetMeKey,
} from "@/src/openapi/queries";
import { useAuthStore } from "@/src/store/auth";
import { setToken } from "@/src/utils/setToken";
import { Button } from "@mossoft/ui-kit";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import AppText from "../AppText/AppText";
import ClientIcon from "../ClientIcon/ClientIcon";

type Props = {};

const ProfileIcon: FC<Props> = () => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { mutateAsync: logout } = useAuthServiceLogout({
    onSuccess: async () => {
      queryClient.setQueriesData({ queryKey: [useUsersServiceGetMeKey] }, null);
    },
  });
  const { isAuthenticated, clearUser } = useAuthStore();
  const { data: currentUser } = useUsersServiceGetMe(undefined, {
    enabled: isAuthenticated,
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  const onLogout = async () => {
    try {
      clearUser();
      await logout();
      setToken("");
      window.location.replace("/");
    } catch (e) {}
  };

  const onAuthenticate = () => {
    if (isAuthenticated) return;
    router.push("?modal=auth", { scroll: false });
  };

  const handleMouseEnter = () => {
    if (!isAuthenticated) return;
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!isAuthenticated) return;
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={onAuthenticate}
        className="group rounded-full cursor-pointer bg-primary-light p-3 w-[44px] h-[44px] flex justify-center items-center text-center hover:bg-primary active:opacity-70"
      >
        {currentUser?.full_name ? (
          <AppText className="text-primary group-hover:!text-white text-sm font-bold leading-1 text-center">
            {getInitials(currentUser.full_name)}
          </AppText>
        ) : (
          <ClientIcon
            name="profile"
            className="!text-primary group-hover:!text-white w-5 h-5"
          />
        )}
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-[-130px] bg-white rounded-lg py-3 px-4 shadow-lg flex flex-col w-48 right-[-30px]"
          >
            <Link
              href="/profile"
              className="text-left px-2 py-1 text-black hover:opacity-70 hover:bg-primary-light rounded"
            >
              Профиль
            </Link>
            <Link
              href="/settings"
              className="text-left px-2 py-1 text-black hover:opacity-70 hover:bg-primary-light rounded"
            >
              Настройки
            </Link>
            <Button
              onClick={onLogout}
              className="text-left w-full !px-2 !py-1 !text-danger hover:opacity-70 rounded"
              variant="link"
            >
              Выход
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileIcon;
