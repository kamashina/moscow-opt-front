import { CardItemResponse } from "@/src/openapi/requests";
import Image from "next/image";
import React from "react";
import AppText from "../AppText/AppText";
import { getServerImage } from "@/src/constants";
import { Icon } from "@mossoft/ui-kit";
import Head from "next/head";
import ProductSchema from "../SEO/ProductSchema";

type Props = {
  item: CardItemResponse;
};

const CardItem = ({ item }: Props) => {
  return (
    <>
      <ProductSchema
        name={item.name}
        image={process.env.NEXT_PUBLIC_FILES_URL + item.images?.[0]}
        description={
          item.description || "Лучшие товары от проверенных поставщиков"
        }
        brand={item.brand}
        price={item.price}
        currency="RUB"
      />

      <div className="flex flex-col gap-1">
        <div className="relative h-[300px] w-full">
          <Image
            src={
              item.images[0]
                ? getServerImage(item.images[0])
                : "/images/itemsPlaceholder.png"
            }
            alt={item.name}
            fill
            sizes="100%"
            className="rounded-[30px]"
          />
        </div>
        <AppText className="font-medium">{item.name}</AppText>
        <div className="flex flex-row justify-between items-center">
          <AppText className="font-medium text-xl text-primary-dark-light">
            {item.price}₽
          </AppText>
          <div className="flex flex-row items-center gap-1">
            <Icon name="star" className="w-4 h-4 !text-[#F6B51E]" />
            <AppText className="!text-[#F6B51E]">
              {item.rating.toFixed(1)}
            </AppText>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
