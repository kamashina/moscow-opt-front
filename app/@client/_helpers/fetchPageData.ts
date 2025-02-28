import {
  ensureUseBannersServiceGetBannersData,
  ensureUseCardsServiceGetNewCardsData,
  ensureUseCategoriesServiceGetPopularCategoriesData,
  ensureUseShopServiceGetAllShopsData,
} from "@/src/openapi/queries/ensureQueryData";
import {
  prefetchUseBannersServiceGetBanners,
  prefetchUseCardsServiceGetNewCards,
  prefetchUseCategoriesServiceGetAllCategories,
  prefetchUseCategoriesServiceGetPopularCategories,
  prefetchUseShopServiceGetAllShops,
} from "@/src/openapi/queries/prefetch";
import { QueryClient } from "@tanstack/react-query";

export async function fetchPageData(queryClient: QueryClient) {
  await prefetchUseCategoriesServiceGetPopularCategories(queryClient);
  await prefetchUseShopServiceGetAllShops(queryClient);
  await prefetchUseBannersServiceGetBanners(queryClient);
  await prefetchUseCardsServiceGetNewCards(queryClient);
  await prefetchUseCategoriesServiceGetAllCategories(queryClient);

  const [categories, cards, banners, shops] = await Promise.all([
    ensureUseCategoriesServiceGetPopularCategoriesData(queryClient),
    ensureUseCardsServiceGetNewCardsData(queryClient),
    ensureUseBannersServiceGetBannersData(queryClient),
    ensureUseShopServiceGetAllShopsData(queryClient),
  ]);

  return { categories, cards, banners, shops };
}
