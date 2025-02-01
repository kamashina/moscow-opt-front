"use client";
import { CardResponse } from "@/src/openapi/requests";
import { Icon, Wrapper } from "@mossoft/ui-kit";
import Link from "next/link";
import { FC } from "react";
import AppText from "../../AppText/AppText";
import CardItem from "../../CardItem/CardItem";

type Props = {
  data: CardResponse[];
};

const CardList: FC<Props> = ({ data }) => {
  return (
    <>
      <Wrapper className="rounded-[30px] w-full">
        <div className="flex flex-row justify-between">
          <AppText className="font-medium text-2xl text-black">Новинки</AppText>
          <Link
            href={"/"}
            className="flex flex-row gap-1 bg-primary rounded-[30px] py-2 px-3 items-center hover:opacity-80 active:opacity-60"
          >
            <AppText className="font-medium text-white">Смотреть все</AppText>
            <Icon name="arrow-left" className="w-6 h-6 rotate-180 text-white" />
          </Link>
        </div>

        <div className={`grid lg:grid-cols-5 grid-cols-1 gap-6`}>
          {data.map((item) => (
            <CardItem key={item.id} item={item.preview} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default CardList;
