"use client";
import AppText from "@/src/components/AppText/AppText";
import Location from "@/src/components/Location/Location";
import Search from "@/src/components/Search/Search";
import { useUsersServiceGetMe } from "@/src/openapi/queries";
import { Icon } from "@mossoft/ui-kit";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

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
    title: "Избранное",
  },
  {
    link: "/",
    iconName: "basket",
    title: "Корзина",
  },
  {
    link: "/auth",
    iconName: "profile",
    title: "Профиль",
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

type Props = {};

const Header: FC<Props> = () => {
  const { data } = useUsersServiceGetMe();
  console.log(data);

  return (
    <>
      <div className="bg-[#EEE] hidden lg:block">
        <div className="lg:max-w-[1440px] mx-auto flex flex-row justify-between items-center h-10">
          <div className="flex flex-row">
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

      <div className="bg-white rounded-b-[30px] px-2">
        <div className="h-20 flex flex-row items-center lg:max-w-[1440px] mx-auto">
          <Link
            href="/"
            title="logo"
            className="relative w-[210px] h-6 mr-[35px]"
          >
            <Image src="logo.svg" fill alt="logo" />
          </Link>

          <div className="flex-row justify-between w-full items-center flex">
            <div className="flex flex-row gap-4 items-center">
              <div className="hidden lg:flex">
                {LEFT_NAV_OPTIONS.map((item) => (
                  <Link
                    title={item.label}
                    key={item.iconName}
                    href={item.link}
                    className="group flex flex-row gap-2 bg-primary-light p-1 pr-4 rounded-[30px] items-center hover:bg-primary active:opacity-70"
                  >
                    <div className="rounded-full bg-primary p-3 group-hover:bg-primary-dark-light">
                      <Icon
                        name={item.iconName}
                        className="w-5 h-5 !text-white"
                      />
                    </div>
                    <AppText className="text-primary group-hover:text-white">
                      {item.label}
                    </AppText>
                  </Link>
                ))}
              </div>
              <Search className="lg:min-w-[650px] hidden lg:flex" />
            </div>

            <div className="flex flex-row gap-2 items-center">
              {RIGHT_NAV_OPTIONS.map((item) => (
                <Link
                  title={item.title}
                  key={item.iconName}
                  href={{
                    pathname: "/",
                    query: { modal: "auth" },
                  }}
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
