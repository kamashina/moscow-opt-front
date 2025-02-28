"use client";
import { getServerFile } from "@/src/constants";
import { useBannersServiceGetBannersSuspense } from "@/src/openapi/queries/suspense";
import { GetBannersResponse } from "@/src/openapi/requests";
import { Icon, useScroll } from "@mossoft/ui-kit";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
type Props = {
  initialData: GetBannersResponse;
};

const Banners: FC<Props> = ({ initialData }) => {
  const { data } = useBannersServiceGetBannersSuspense(undefined, {
    initialData,
  });
  console.log(data);

  const [bannerId, setBannerId] = useState(data[0].id);
  const [executeScroll, elRef] = useScroll();
  useEffect(executeScroll as any, [bannerId]);
  console.log(bannerId);

  const currentIndex = data?.findIndex((item) => item.id === bannerId);

  const handleScroll = (position: "left" | "right") => {
    if (!data?.length) return;

    if (position === "left") {
      setBannerId(data[currentIndex - 1].id);
      return;
    }
    if (position === "right") {
      setBannerId(data[currentIndex + 1].id);
      return;
    }
  };
  console.log(data?.[currentIndex - 1]?.id);

  return (
    <div className="relative w-full">
      <div className="overflow-x-hidden w-full flex flex-row items-center scrollbar-hide rounded-[30px]">
        {data?.map((item) => (
          <div
            ref={bannerId === item.id ? elRef : null}
            key={item.id}
            className="w-full h-[400px] relative shrink-0 cursor-pointer"
          >
            <Image
              src={getServerFile(item.imagePath)}
              fill
              sizes="100%"
              priority
              alt={item.imagePath}
              title={item.seo}
            />
          </div>
        ))}
      </div>
      {data?.[currentIndex - 1]?.id && (
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-2 rounded-r-[25px] bg-primary cursor-pointer active:opacity-70"
          onClick={() => handleScroll("left")}
        >
          <Icon name="arrow-left" className="w-10 h-10 !text-white" />
        </div>
      )}
      {data?.[currentIndex + 1]?.id && (
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-2 rounded-r-[25px] bg-primary rotate-180 cursor-pointer active:opacity-70"
          onClick={() => handleScroll("right")}
        >
          <Icon name="arrow-left" className="w-10 h-10 !text-white" />
        </div>
      )}
    </div>
  );
};

export default Banners;
