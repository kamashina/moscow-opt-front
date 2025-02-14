import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import ClientIcon from "@/src/components/ClientIcon/ClientIcon";
import Drawer from "@/src/components/Drawer/Drawer";
import Location from "@/src/components/Location/Location";
import Search from "@/src/components/Search/Search";
import { ensureUseCategoriesServiceGetAllCategoriesData } from "@/src/openapi/queries/ensureQueryData";
import Image from "next/image";
import Link from "next/link";

const TOP_HEADER_OPTIONS = [
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

const Header = async () => {
  const queryClient = getQueryClient();
  const initialCategories =
    await ensureUseCategoriesServiceGetAllCategoriesData(queryClient);

  const LEFT_NAV_OPTIONS = [
    {
      link: "/",
      iconName: "catalog",
      label: "Каталог",
      renderItem: () => <Drawer initialData={initialCategories} />,
    },
    {
      link: "/",
      iconName: "shops",
      label: "Магазины",
      renderItem: () => (
        <Link
          href="/"
          className="group flex flex-row gap-2 bg-primary-light p-1 pr-4 rounded-[25px] items-center hover:bg-primary active:opacity-70"
        >
          <div className="rounded-full bg-white p-3 group-hover:bg-white">
            <ClientIcon name="shops" className="w-5 h-5 !text-primary" />
          </div>
          <AppText className="text-primary group-hover:text-white">
            Магазины
          </AppText>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="bg-[#EEE] relative z-[1000] hidden lg:block">
        <div className="lg:max-w-[1440px] mx-auto flex flex-row justify-between items-center h-10">
          <div className="flex flex-row">
            {TOP_HEADER_OPTIONS.map((item) => (
              <Link
                title={item.label}
                key={item.link}
                href={item.link}
                className="hover:bg-primary hover:text-white rounded-[25px] py-1 px-3 font-normal text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Location />
        </div>
      </div>

      <div className="relative px-0 lg:sticky bg-white z-[1000] top-0 rounded-b-[25px] lg:px-2 backdrop-blur-[1px] shadow-lg">
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
              <div className="hidden lg:flex gap-3">
                {LEFT_NAV_OPTIONS.map((item) => (
                  <div key={item.label}>
                    {item.renderItem ? item.renderItem() : <></>}
                  </div>
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
                  <ClientIcon
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
