"use client";
import PopularWrapper from "@/src/components/PopularWrapper/PopularWrapper";
import { useShopServiceGetAllShopsSuspense } from "@/src/openapi/queries/suspense";

type Props<T> = {
  initialData: T;
};

const Shops = <T extends any[]>({ initialData }: Props<T>) => {
  const { data } = useShopServiceGetAllShopsSuspense(undefined, {
    initialData,
  });

  return <PopularWrapper label="Популярные магазины" href="/" data={data} />;
};

export default Shops;
