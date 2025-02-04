"use client";
import PopularWrapper from "@/src/components/PopularWrapper/PopularWrapper";
import { useShopServiceGetAllShopsSuspense } from "@/src/openapi/queries/suspense";
import { GetAllShopsResponse } from "@/src/openapi/requests";

type Props = {
  initialData: GetAllShopsResponse;
};

const Shops = ({ initialData }: Props) => {
  const { data } = useShopServiceGetAllShopsSuspense(undefined, {
    initialData,
  });

  return (
    <PopularWrapper
      label="Популярные магазины"
      href="/"
      data={data}
      imageClassName="w-[155px] h-[155px]"
    />
  );
};

export default Shops;
