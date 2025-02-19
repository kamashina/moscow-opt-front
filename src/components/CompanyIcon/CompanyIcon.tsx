"use client";
import { getQueryClient } from "@/src/api/api";
import {
  useAuthServiceLogout,
  useCompaniesServiceGetAllCompaniesKey,
  useCompaniesServiceGetMyCompany,
  useUsersServiceGetMeKey,
} from "@/src/openapi/queries";
import { setToken } from "@/src/utils/setToken";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AppText from "../AppText/AppText";

type Props = {};

const CompanyIcon = ({}: Props) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const { data, isPending } = useCompaniesServiceGetMyCompany();
  const { mutateAsync: logout } = useAuthServiceLogout({
    onSuccess: async () => {
      queryClient.setQueriesData(
        {
          queryKey: [
            useUsersServiceGetMeKey,
            useCompaniesServiceGetAllCompaniesKey,
          ],
        },
        null
      );
    },
  });

  useEffect(() => {
    if (isPending) return;
    if (!data?.shop?.id) {
      router.push("/shop/create");
    }
  }, [data]);

  const onLogout = async () => {
    try {
      await logout();
      setToken("");
      router.push("/");
    } catch (e) {}
  };

  const handleMouseEnter = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  return (
    <div>
      <div
        onClick={onLogout}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AppText>{data?.name}</AppText>
      </div>
    </div>
  );
};

export default CompanyIcon;
