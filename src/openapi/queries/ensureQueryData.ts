// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, BannersService, BasketService, BrandsService, CardsService, CategoriesService, CompaniesService, DaDataService, FavoritesService, FiltersService, GeolocationService, ItemService, MeilisearchService, ShopService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseAuthServiceGetSmsTimerData = (queryClient: QueryClient, { phone }: {
  phone: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAuthServiceGetSmsTimerKeyFn({ phone }), queryFn: () => AuthService.getSmsTimer({ phone }) });
export const ensureUseUsersServiceFindAllData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceFindAllKeyFn(), queryFn: () => UsersService.findAll() });
export const ensureUseUsersServiceGetMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
export const ensureUseUsersServiceGetByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetByIdKeyFn({ id }), queryFn: () => UsersService.getById({ id }) });
export const ensureUseCompaniesServiceGetAllCompaniesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCompaniesServiceGetAllCompaniesKeyFn(), queryFn: () => CompaniesService.getAllCompanies() });
export const ensureUseCompaniesServiceGetMyCompanyData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCompaniesServiceGetMyCompanyKeyFn(), queryFn: () => CompaniesService.getMyCompany() });
export const ensureUseFiltersServiceGetFiltersBySubCategoryIdData = (queryClient: QueryClient, { subCategoryId }: {
  subCategoryId: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseFiltersServiceGetFiltersBySubCategoryIdKeyFn({ subCategoryId }), queryFn: () => FiltersService.getFiltersBySubCategoryId({ subCategoryId }) });
export const ensureUseShopServiceGetMyShopData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseShopServiceGetMyShopKeyFn(), queryFn: () => ShopService.getMyShop() });
export const ensureUseShopServiceGetAllShopsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseShopServiceGetAllShopsKeyFn(), queryFn: () => ShopService.getAllShops() });
export const ensureUseCategoriesServiceGetAllCategoriesData = (queryClient: QueryClient, { isPopular }: {
  isPopular?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetAllCategoriesKeyFn({ isPopular }), queryFn: () => CategoriesService.getAllCategories({ isPopular }) });
export const ensureUseCategoriesServiceGetPopularCategoriesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetPopularCategoriesKeyFn(), queryFn: () => CategoriesService.getPopularCategories() });
export const ensureUseCategoriesServiceGetSubCategoriesByIdsData = (queryClient: QueryClient, { ids }: {
  ids: number[];
}) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetSubCategoriesByIdsKeyFn({ ids }), queryFn: () => CategoriesService.getSubCategoriesByIds({ ids }) });
export const ensureUseCategoriesServiceGetSubCategoryByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetSubCategoryByIdKeyFn({ id }), queryFn: () => CategoriesService.getSubCategoryById({ id }) });
export const ensureUseItemServiceGetAllItemsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetAllItemsKeyFn(), queryFn: () => ItemService.getAllItems() });
export const ensureUseItemServiceGetItemsByMyShopData = (queryClient: QueryClient, { limit, offset, q, status }: {
  limit?: number;
  offset?: number;
  q?: string;
  status?: "all" | "active" | "reject" | "draft";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetItemsByMyShopKeyFn({ limit, offset, q, status }), queryFn: () => ItemService.getItemsByMyShop({ limit, offset, q, status }) });
export const ensureUseItemServiceGetItemsByIdsData = (queryClient: QueryClient, { ids }: {
  ids: number[];
}) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetItemsByIdsKeyFn({ ids }), queryFn: () => ItemService.getItemsByIds({ ids }) });
export const ensureUseItemServiceGetByIdData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetByIdKeyFn(), queryFn: () => ItemService.getById() });
export const ensureUseMeilisearchServiceSearchData = (queryClient: QueryClient, { query }: {
  query?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseMeilisearchServiceSearchKeyFn({ query }), queryFn: () => MeilisearchService.search({ query }) });
export const ensureUseBasketServiceGetMyBasketData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBasketServiceGetMyBasketKeyFn(), queryFn: () => BasketService.getMyBasket() });
export const ensureUseBasketServiceGetTotalItemsInBasketData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBasketServiceGetTotalItemsInBasketKeyFn(), queryFn: () => BasketService.getTotalItemsInBasket() });
export const ensureUseDaDataServiceGetPartyData = (queryClient: QueryClient, { inn }: {
  inn: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDaDataServiceGetPartyKeyFn({ inn }), queryFn: () => DaDataService.getParty({ inn }) });
export const ensureUseDaDataServiceGetAddressData = (queryClient: QueryClient, { q }: {
  q: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDaDataServiceGetAddressKeyFn({ q }), queryFn: () => DaDataService.getAddress({ q }) });
export const ensureUseCardsServiceGetAllCardsData = (queryClient: QueryClient, { q, status }: {
  q?: string;
  status?: "active" | "reject" | "draft" | "in_confirmation";
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseCardsServiceGetAllCardsKeyFn({ q, status }), queryFn: () => CardsService.getAllCards({ q, status }) });
export const ensureUseCardsServiceGetNewCardsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCardsServiceGetNewCardsKeyFn(), queryFn: () => CardsService.getNewCards() });
export const ensureUseBrandsServiceGetBrandsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBrandsServiceGetBrandsKeyFn(), queryFn: () => BrandsService.getBrands() });
export const ensureUseBrandsServiceGetBrandByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseBrandsServiceGetBrandByIdKeyFn({ id }), queryFn: () => BrandsService.getBrandById({ id }) });
export const ensureUseGeolocationServiceGetCityByCoordinatesData = (queryClient: QueryClient, { lat, lon }: {
  lat: number;
  lon: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGeolocationServiceGetCityByCoordinatesKeyFn({ lat, lon }), queryFn: () => GeolocationService.getCityByCoordinates({ lat, lon }) });
export const ensureUseBannersServiceGetBannersData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBannersServiceGetBannersKeyFn(), queryFn: () => BannersService.getBanners() });
export const ensureUseFavoritesServiceGetFavoritesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseFavoritesServiceGetFavoritesKeyFn(), queryFn: () => FavoritesService.getFavorites() });
