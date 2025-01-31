"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import AppText from "../AppText/AppText";
import Search from "../Search/Search";
import { Icon } from "@mossoft/ui-kit";
import Location from "../Location/Location";

type Props = {};

const HEADER_OPTIONS = [
  { label: "Перейти в магазин", link: "/shop" },
  { label: "О нас", link: "/about" },
  { label: "Статьи", link: "/articles" },
  { label: "Информация для поставщиков", link: "/suppliers" },
  { label: "Помощь для клиентов", link: "/help" },
  { label: "Поддержка", link: "/support" },
];

const RIGHT_NAV_OPTIONS = [
  {
    link: "/",
    iconName: "like",
  },
  {
    link: "/",
    iconName: "basket",
  },
  {
    link: "/",
    iconName: "profile",
  },
];
const LEFT_NAV_OPTIONS = [
  {
    link: "/",
    iconName: "catalog",
    label: "Каталог",
  },
  {
    link: "/",
    iconName: "shops",
    label: "Магазины",
  },
];

const Header: FC<Props> = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <div className="bg-[#EEE]">
        <div className="lg:max-w-[1440px] mx-auto flex flex-row justify-between items-center h-10 px-8">
          <div className="flex flex-row gap-8">
            {HEADER_OPTIONS.map((item) => (
              <Link
                title={item.label}
                key={item.link}
                href={item.link}
                className="hover:bg-primary hover:text-white rounded-[30px] py-1 px-3 font-normal text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Location />
        </div>
      </div>

      <div className="bg-white rounded-b-[30px]">
        <div className="h-20 px-8 flex flex-row items-center lg:max-w-[1440px] mx-auto">
          <Link
            href="/"
            title="logo"
            className="relative w-[170px] h-6 mr-[80px]"
          >
            <Image src="logo.svg" fill alt="logo" />
          </Link>

          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row gap-4 items-center">
              {LEFT_NAV_OPTIONS.map((item) => (
                <Link title={item.label} key={item.iconName} href={item.link}>
                  <div className="group flex flex-row gap-2 bg-primary-light p-1 pr-4 rounded-[30px] items-center hover:bg-primary active:opacity-70">
                    <div className="rounded-full bg-primary p-3 group-hover:bg-primary-dark-light">
                      <Icon name={item.iconName} className="w-5 h-5" />
                    </div>
                    <AppText className="text-primary group-hover:text-white">
                      {item.label}
                    </AppText>
                  </div>
                </Link>
              ))}

              <Search onChange={onSearch} className="lg:min-w-[550px]" />
            </div>

            <div className="flex flex-row gap-2 items-center">
              {RIGHT_NAV_OPTIONS.map((item) => (
                <Link
                  title={item.iconName}
                  key={item.iconName}
                  href={item.link}
                  className="group rounded-full bg-primary-light p-3 hover:bg-primary active:opacity-70"
                >
                  <Icon
                    name={item.iconName}
                    className="!text-primary group-hover:!text-white w-5 h-5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
