// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { BannersService, BasketService, BrandsService, CardsService, CategoriesService, CompaniesService, DaDataService, FavoritesService, GeolocationService, ItemService, ShopService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseUsersServiceFindAll = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceFindAllKeyFn(), queryFn: () => UsersService.findAll() });
export const prefetchUseUsersServiceGetMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
export const prefetchUseUsersServiceGetById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetByIdKeyFn({ id }), queryFn: () => UsersService.getById({ id }) });
export const prefetchUseCompaniesServiceGetAllCompanies = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCompaniesServiceGetAllCompaniesKeyFn(), queryFn: () => CompaniesService.getAllCompanies() });
export const prefetchUseCompaniesServiceGetMyCompany = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCompaniesServiceGetMyCompanyKeyFn(), queryFn: () => CompaniesService.getMyCompany() });
export const prefetchUseShopServiceGetMyShop = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseShopServiceGetMyShopKeyFn(), queryFn: () => ShopService.getMyShop() });
export const prefetchUseShopServiceGetAllShops = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseShopServiceGetAllShopsKeyFn(), queryFn: () => ShopService.getAllShops() });
export const prefetchUseCategoriesServiceGetAllCategories = (queryClient: QueryClient, { isPopular }: {
  isPopular?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetAllCategoriesKeyFn({ isPopular }), queryFn: () => CategoriesService.getAllCategories({ isPopular }) });
export const prefetchUseCategoriesServiceGetPopularCategories = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetPopularCategoriesKeyFn(), queryFn: () => CategoriesService.getPopularCategories() });
export const prefetchUseCategoriesServiceGetSubCategoryById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseCategoriesServiceGetSubCategoryByIdKeyFn({ id }), queryFn: () => CategoriesService.getSubCategoryById({ id }) });
export const prefetchUseItemServiceGetAllItems = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetAllItemsKeyFn(), queryFn: () => ItemService.getAllItems() });
export const prefetchUseItemServiceGetById = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseItemServiceGetByIdKeyFn(), queryFn: () => ItemService.getById() });
export const prefetchUseBasketServiceGetMyBasket = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBasketServiceGetMyBasketKeyFn(), queryFn: () => BasketService.getMyBasket() });
export const prefetchUseBasketServiceGetTotalItemsInBasket = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseBasketServiceGetTotalItemsInBasketKeyFn(), queryFn: () => BasketService.getTotalItemsInBasket() });
export const prefetchUseDaDataServiceGetParty = (queryClient: QueryClient, { query }: {
  query: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseDaDataServiceGetPartyKeyFn({ query }), queryFn: () => DaDataService.getParty({ query }) });
export const prefetchUseCardsServiceGetAllCards = (queryClient: QueryClient, { q }: {
  q?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseCardsServiceGetAllCardsKeyFn({ q }), queryFn: () => CardsService.getAllCards({ q }) });
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
