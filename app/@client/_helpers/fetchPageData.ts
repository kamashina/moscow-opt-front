import {
  ensureUseCategoriesServiceGetPopularCategoriesData,
  ensureUseCardsServiceGetAllCardsData,
  ensureUseBannersServiceGetBannersData,
  ensureUseShopServiceGetAllShopsData,
} from "@/src/openapi/queries/ensureQueryData";
import {
  prefetchUseCategoriesServiceGetPopularCategories,
  prefetchUseShopServiceGetAllShops,
  prefetchUseBannersServiceGetBanners,
  prefetchUseCardsServiceGetAllCards,
} from "@/src/openapi/queries/prefetch";
import { QueryClient } from "@tanstack/react-query";

export async function fetchPageData(queryClient: QueryClient) {
  await prefetchUseCategoriesServiceGetPopularCategories(queryClient);
  await prefetchUseShopServiceGetAllShops(queryClient);
  await prefetchUseBannersServiceGetBanners(queryClient);
  await prefetchUseCardsServiceGetAllCards(queryClient);

  const [categories, cards, banners, shops] = await Promise.all([
    ensureUseCategoriesServiceGetPopularCategoriesData(queryClient),
    ensureUseCardsServiceGetAllCardsData(queryClient),
    ensureUseBannersServiceGetBannersData(queryClient),
    ensureUseShopServiceGetAllShopsData(queryClient),
  ]);

  return { categories, cards, banners, shops };
}
