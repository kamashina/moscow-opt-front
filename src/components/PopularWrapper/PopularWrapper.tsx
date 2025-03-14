"use client";
import { Icon, Wrapper } from "@mossoft/ui-kit";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import AppText from "../AppText/AppText";
import CustomSkeleton from "../Skeleton/Skeleton";
import { getServerFile } from "@/src/constants";

type Props<T> = {
  label: string;
  href: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  data: T;
};

const PopularWrapper = <T extends any[]>({
  label,
  data,
  href,
  imageClassName,
  imageWrapperClassName,
}: Props<T>) => {
  if (!data?.length) {
    return <CustomSkeleton height={337} />;
  }

  return (
    <Wrapper className="rounded-[25px] w-full">
      <div className="flex flex-row justify-between">
        <AppText className="font-medium text-2xl text-black">{label}</AppText>
        <Link
          href={href}
          className="flex flex-row gap-1 bg-primary rounded-[25px] py-2 px-3 items-center hover:opacity-80 active:opacity-60"
        >
          <AppText className="font-medium text-white">Смотреть все</AppText>
          <Icon name="arrow-left" className="w-6 h-6 rotate-180 text-white" />
        </Link>
      </div>

      <div
        className={twMerge(
          "flex flex-row justify-between mt-4 w-full overflow-x-auto",
          imageWrapperClassName
        )}
      >
        {data.map((item) => (
          <Link
            key={item.id}
            className="flex flex-col justify-between items-center"
            href={`/shops/${item.id}`}
          >
            <div
              className={twMerge(
                "relative  w-[250px] h-[250px]",
                imageClassName
              )}
            >
              <Image
                className="rounded-[25px]"
                src={getServerFile(item.logo)}
                alt={item.name}
                fill
                sizes="100%"
              />
            </div>

            <AppText>{item.name}</AppText>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default PopularWrapper;
