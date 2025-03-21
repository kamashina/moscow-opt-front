// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, BannersService, BasketService, BrandsService, CardsService, CategoriesService, CompaniesService, DaDataService, FavoritesService, FiltersService, GeolocationService, ItemService, MeilisearchService, ShopService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseAuthServiceGetSmsTimer = (queryClient: QueryClient, { phone }: {
  phone: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAuthServiceGetSmsTimerKeyFn({ phone }), queryFn: () => AuthService.getSmsTimer({ phone }) });
export const prefetchUseUsersServiceFindAll = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceFindAllKeyFn(), queryFn: () => UsersService.findAll() });
export const prefetchUseUsersServiceGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
export const prefetchUseUsersServiceGetById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetByIdKeyFn({ id }), queryFn: () => UsersService.getById({ id }) });
export const prefetchUseCompaniesServiceGetAllCompanies = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCompaniesServiceGetAllCompaniesKeyFn(), queryFn: () => CompaniesService.getAllCompanies() });
export const prefetchUseCompaniesServiceGetMyCompany = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCompaniesServiceGetMyCompanyKeyFn(), queryFn: () => CompaniesService.getMyCompany() });
export const prefetchUseFiltersServiceGetFiltersBySubCategoryId = (queryClient: QueryClient, { subCategoryId }: {
  subCategoryId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseFiltersServiceGetFiltersBySubCategoryIdKeyFn({ subCategoryId }), queryFn: () => FiltersService.getFiltersBySubCategoryId({ subCategoryId }) });
export const prefetchUseShopServiceGetMyShop = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseShopServiceGetMyShopKeyFn(), queryFn: () => ShopService.getMyShop() });
export const prefetchUseShopServiceGetAllShops = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseShopServiceGetAllShopsKeyFn(), queryFn: () => ShopService.getAllShops() });
export const prefetchUseCategoriesServiceGetAllCategories = (queryClient: QueryClient, { isPopular }: {
  isPopular?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetAllCategoriesKeyFn({ isPopular }), queryFn: () => CategoriesService.getAllCategories({ isPopular }) });
export const prefetchUseCategoriesServiceGetPopularCategories = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetPopularCategoriesKeyFn(), queryFn: () => CategoriesService.getPopularCategories() });
export const prefetchUseCategoriesServiceGetSubCategoriesByIds = (queryClient: QueryClient, { ids }: {
  ids: number[];
}) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetSubCategoriesByIdsKeyFn({ ids }), queryFn: () => CategoriesService.getSubCategoriesByIds({ ids }) });
export const prefetchUseCategoriesServiceGetSubCategoryById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetSubCategoryByIdKeyFn({ id }), queryFn: () => CategoriesService.getSubCategoryById({ id }) });
export const prefetchUseItemServiceGetAllItems = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetAllItemsKeyFn(), queryFn: () => ItemService.getAllItems() });
export const prefetchUseItemServiceGetItemsByMyShop = (queryClient: QueryClient, { limit, offset, q, status }: {
  limit?: number;
  offset?: number;
  q?: string;
  status?: "all" | "active" | "reject" | "draft";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetItemsByMyShopKeyFn({ limit, offset, q, status }), queryFn: () => ItemService.getItemsByMyShop({ limit, offset, q, status }) });
export const prefetchUseItemServiceGetItemsByIds = (queryClient: QueryClient, { ids }: {
  ids: number[];
}) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetItemsByIdsKeyFn({ ids }), queryFn: () => ItemService.getItemsByIds({ ids }) });
export const prefetchUseItemServiceGetById = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetByIdKeyFn(), queryFn: () => ItemService.getById() });
export const prefetchUseMeilisearchServiceSearch = (queryClient: QueryClient, { query }: {
  query?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseMeilisearchServiceSearchKeyFn({ query }), queryFn: () => MeilisearchService.search({ query }) });
export const prefetchUseBasketServiceGetMyBasket = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBasketServiceGetMyBasketKeyFn(), queryFn: () => BasketService.getMyBasket() });
export const prefetchUseBasketServiceGetTotalItemsInBasket = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBasketServiceGetTotalItemsInBasketKeyFn(), queryFn: () => BasketService.getTotalItemsInBasket() });
export const prefetchUseDaDataServiceGetParty = (queryClient: QueryClient, { inn }: {
  inn: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDaDataServiceGetPartyKeyFn({ inn }), queryFn: () => DaDataService.getParty({ inn }) });
export const prefetchUseDaDataServiceGetAddress = (queryClient: QueryClient, { q }: {
  q: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDaDataServiceGetAddressKeyFn({ q }), queryFn: () => DaDataService.getAddress({ q }) });
export const prefetchUseCardsServiceGetAllCards = (queryClient: QueryClient, { q, status }: {
  q?: string;
  status?: "active" | "reject" | "draft" | "in_confirmation";
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseCardsServiceGetAllCardsKeyFn({ q, status }), queryFn: () => CardsService.getAllCards({ q, status }) });
export const prefetchUseCardsServiceGetNewCards = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCardsServiceGetNewCardsKeyFn(), queryFn: () => CardsService.getNewCards() });
export const prefetchUseBrandsServiceGetBrands = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBrandsServiceGetBrandsKeyFn(), queryFn: () => BrandsService.getBrands() });
export const prefetchUseBrandsServiceGetBrandById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseBrandsServiceGetBrandByIdKeyFn({ id }), queryFn: () => BrandsService.getBrandById({ id }) });
export const prefetchUseGeolocationServiceGetCityByCoordinates = (queryClient: QueryClient, { lat, lon }: {
  lat: number;
  lon: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGeolocationServiceGetCityByCoordinatesKeyFn({ lat, lon }), queryFn: () => GeolocationService.getCityByCoordinates({ lat, lon }) });
export const prefetchUseBannersServiceGetBanners = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBannersServiceGetBannersKeyFn(), queryFn: () => BannersService.getBanners() });
export const prefetchUseFavoritesServiceGetFavorites = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseFavoritesServiceGetFavoritesKeyFn(), queryFn: () => FavoritesService.getFavorites() });
