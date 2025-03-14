"use client";
import AppText from "@/src/components/AppText/AppText";
import CardItem from "@/src/components/CardItem/CardItem";
import { useCardsServiceGetNewCards } from "@/src/openapi/queries";
import { Icon, Wrapper } from "@mossoft/ui-kit";
import Link from "next/link";
import { FC } from "react";

type Props = {};

const Card: FC<Props> = () => {
  const { data: cards } = useCardsServiceGetNewCards();

  return (
    <Wrapper className="rounded-[25px] w-full">
      <div className="flex flex-row justify-between mb-4">
        <AppText className="font-medium text-2xl text-black">Новинки</AppText>
        <Link
          href="/catalog"
          className="flex flex-row gap-1 bg-primary rounded-[25px] py-2 px-3 items-center hover:opacity-80 active:opacity-60"
        >
          <AppText className="font-medium text-white">Смотреть все</AppText>
          <Icon name="arrow-left" className="w-6 h-6 rotate-180 text-white" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
        {cards?.map((item) => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Card;
