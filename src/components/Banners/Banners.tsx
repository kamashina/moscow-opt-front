"use client";
import { useBannersServiceGetBanners } from "@/src/openapi/queries";
import { Icon, useScroll } from "@mossoft/ui-kit";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import CustomSkeleton from "../Skeleton/Skeleton";
import { useBannersServiceGetBannersSuspense } from "@/src/openapi/queries/suspense";
import { GetBannersResponse } from "@/src/openapi/requests";

type Props = {
  banners: GetBannersResponse;
};

const Banners: FC<Props> = ({ banners }) => {
  const [bannerId, setBannerId] = useState(1);
  const [executeScroll, elRef] = useScroll();
  useEffect(executeScroll as any, [bannerId]);

  if (!banners?.length) {
    return <CustomSkeleton />;
  }

  const currentIndex = banners?.findIndex((item) => item.id === bannerId);

  const handleScroll = (position: "left" | "right") => {
    if (!banners?.length) return;

    if (position === "left") {
      setBannerId(banners[currentIndex - 1].id);
      return;
    }
    if (position === "right") {
      setBannerId(banners[currentIndex + 1].id);
      return;
    }
  };

  return (
    <div className="relative w-full">
      {banners?.[currentIndex - 1]?.id && (
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 rounded-r-[30px] bg-primary cursor-pointer hover:bg-primary-dark-light active:opacity-70"
          onClick={() => handleScroll("left")}
        >
          <Icon name="arrow-left" className="w-10 h-10 !text-white" />
        </div>
      )}
      <div className="overflow-x-scroll w-full flex flex-row items-center scrollbar-hide rounded-[30px]">
        {banners?.map((item) => (
          <div
            ref={bannerId === item.id ? elRef : null}
            key={item.id}
            className="w-full h-[400px] relative shrink-0 cursor-pointer"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_FILES_URL}${item.imagePath}`}
              fill
              priority
              alt={item.imagePath}
              title={item.seo}
            />
          </div>
        ))}
      </div>
      {banners?.[currentIndex + 1]?.id && (
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-r-[30px] bg-primary rotate-180 cursor-pointer hover:bg-primary-dark-light active:opacity-70"
          onClick={() => handleScroll("right")}
        >
          <Icon name="arrow-left" className="w-10 h-10 !text-white" />
        </div>
      )}
    </div>
  );
};

export default Banners;
