import { getQueryClient } from "@/src/api/api";
import {
  ensureUseBannersServiceGetBannersData,
  ensureUseCardsServiceGetAllCardsData,
  ensureUseCategoriesServiceGetPopularCategoriesData,
  ensureUseShopServiceGetAllShopsData,
} from "@/src/openapi/queries/ensureQueryData";
import {
  prefetchUseBannersServiceGetBanners,
  prefetchUseCardsServiceGetAllCards,
  prefetchUseCategoriesServiceGetPopularCategories,
  prefetchUseShopServiceGetAllShops,
} from "@/src/openapi/queries/prefetch";

import Cards from "./_components/Cards";

import Shops from "./_components/Shops";

import dynamic from "next/dynamic";
import Categories from "./_components/Categories";
const Banners = dynamic(() => import("./_components/Banners"), {});

export async function generateMetadata() {
  const queryClient = getQueryClient();
  await prefetchUseCategoriesServiceGetPopularCategories(queryClient);
  await prefetchUseShopServiceGetAllShops(queryClient);
  await prefetchUseBannersServiceGetBanners(queryClient);
  await prefetchUseCardsServiceGetAllCards(queryClient);

  const categories = await ensureUseCategoriesServiceGetPopularCategoriesData(
    queryClient
  );

  const cards = await ensureUseCardsServiceGetAllCardsData(queryClient);
  const shops = await ensureUseShopServiceGetAllShopsData(queryClient);
  const categoriesKeywords = categories.map(({ name }) => name).join(", ");
  const cardsKeywords = cards
    .map(({ preview }) => preview.name)
    .join(", ")
    .slice(0, 150);

  return {
    prosp: {
      title: "Купить товары оптом от производителей",
    },
    title: "Товары оптом от производителя по низким ценам",
    description:
      "Лучшие оптовые магазины с товарами в наличии. Прямые поставки, скидки до 60%, выгодные предложения!",
    keywords: `${categoriesKeywords}, ${cardsKeywords}`,
    openGraph: {
      title: "Купить товары оптом от производителей",
      description:
        "Лучшие оптовые магазины с товарами в наличии. Прямые поставки, скидки до 60%, выгодные предложения!",
      siteName: "Название сайта",
      images: shops.map((item) => ({
        url: process.env.NEXT_PUBLIC_FILES_URL + item.logo,
        width: 1200,
        height: 630,
        alt: "Лучшие товары оптом по выгодным ценам",
      })),
      type: "website",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: "Купить товары оптом от производителей",
      description:
        "Лучшие оптовые магазины с товарами в наличии. Прямые поставки, скидки до 60%, выгодные предложения!",
      images: categories.map(
        ({ logo }) => process.env.NEXT_PUBLIC_FILES_URL + logo
      ),
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_CLIENT_DOMAIN,
    },
    robots: "index, follow",
  };
}

const Page = async () => {
  const queryClient = getQueryClient();
  const categories = await ensureUseCategoriesServiceGetPopularCategoriesData(
    queryClient
  );

  const cards = await ensureUseCardsServiceGetAllCardsData(queryClient);

  const banners = await ensureUseBannersServiceGetBannersData(queryClient);

  const shops = await ensureUseShopServiceGetAllShopsData(queryClient);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <h1 className="sr-only">Товары оптом по выгодным ценам</h1>

      <Banners initialData={banners} />

      <Shops initialData={shops} />

      <Categories initialData={categories} />

      <Cards initialData={cards} />
    </div>
  );
};

export default Page;
