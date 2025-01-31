import { Wrapper, Icon } from "@mossoft/ui-kit";
import Link from "next/link";
import React from "react";
import AppText from "../AppText/AppText";
import { useShopServiceGetAllShops } from "@/src/openapi/queries";
import CustomSkeleton from "../Skeleton/Skeleton";
import Image from "next/image";
const ShopsList = () => {
  const { data: shops, isLoading } = useShopServiceGetAllShops();
  console.log(shops);

  if (isLoading || !shops?.length) {
    return <CustomSkeleton height={337} />;
  }

  return (
    <Wrapper className="rounded-[30px] w-full">
      <div className="flex flex-row justify-between">
        <AppText className="font-bold text-2xl text-black">
          Популярные магазины
        </AppText>
        <Link
          href="/"
          className="flex flex-row gap-1 bg-primary rounded-[30px] py-2 px-3 items-center"
        >
          <AppText className="font-medium text-white">Смотреть все</AppText>
          <Icon name="arrow-left" className="w-6 h-6 rotate-180 text-white" />
        </Link>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        {shops.map((item) => (
          <Link
            key={item.id}
            className="flex flex-col gap-2 items-center"
            href="/"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_FILES_URL}${item.logo}`}
              width={155}
              height={155}
              className="rounded-[30px]"
              alt={item.name}
            />

            <AppText>{item.name}</AppText>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default ShopsList;
