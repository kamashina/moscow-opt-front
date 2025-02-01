// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { BannersService, BasketService, BrandsService, CardsService, CategoriesService, CompaniesService, DaDataService, GeolocationService, ItemService, ShopService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseUsersServiceFindAllData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceFindAllKeyFn(), queryFn: () => UsersService.findAll() });
export const ensureUseUsersServiceGetMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetMeKeyFn(), queryFn: () => UsersService.getMe() });
export const ensureUseUsersServiceGetByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetByIdKeyFn({ id }), queryFn: () => UsersService.getById({ id }) });
export const ensureUseCompaniesServiceGetAllCompaniesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCompaniesServiceGetAllCompaniesKeyFn(), queryFn: () => CompaniesService.getAllCompanies() });
export const ensureUseCompaniesServiceGetMyCompanyData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCompaniesServiceGetMyCompanyKeyFn(), queryFn: () => CompaniesService.getMyCompany() });
export const ensureUseShopServiceGetMyShopData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseShopServiceGetMyShopKeyFn(), queryFn: () => ShopService.getMyShop() });
export const ensureUseShopServiceGetAllShopsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseShopServiceGetAllShopsKeyFn(), queryFn: () => ShopService.getAllShops() });
export const ensureUseCategoriesServiceGetAllCategoriesData = (queryClient: QueryClient, { isPopular }: {
  isPopular?: boolean;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetAllCategoriesKeyFn({ isPopular }), queryFn: () => CategoriesService.getAllCategories({ isPopular }) });
export const ensureUseCategoriesServiceGetPopularCategoriesData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetPopularCategoriesKeyFn(), queryFn: () => CategoriesService.getPopularCategories() });
export const ensureUseCategoriesServiceGetSubCategoryByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseCategoriesServiceGetSubCategoryByIdKeyFn({ id }), queryFn: () => CategoriesService.getSubCategoryById({ id }) });
export const ensureUseItemServiceGetAllItemsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetAllItemsKeyFn(), queryFn: () => ItemService.getAllItems() });
export const ensureUseItemServiceGetByIdData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseItemServiceGetByIdKeyFn(), queryFn: () => ItemService.getById() });
export const ensureUseBasketServiceGetMyBasketData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBasketServiceGetMyBasketKeyFn(), queryFn: () => BasketService.getMyBasket() });
export const ensureUseBasketServiceGetTotalItemsInBasketData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBasketServiceGetTotalItemsInBasketKeyFn(), queryFn: () => BasketService.getTotalItemsInBasket() });
export const ensureUseDaDataServiceGetPartyData = (queryClient: QueryClient, { query }: {
  query: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseDaDataServiceGetPartyKeyFn({ query }), queryFn: () => DaDataService.getParty({ query }) });
export const ensureUseCardsServiceGetAllCardsData = (queryClient: QueryClient, { q }: {
  q?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseCardsServiceGetAllCardsKeyFn({ q }), queryFn: () => CardsService.getAllCards({ q }) });
export const ensureUseBrandsServiceGetBrandsData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBrandsServiceGetBrandsKeyFn(), queryFn: () => BrandsService.getBrands() });
export const ensureUseBrandsServiceGetBrandByIdData = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseBrandsServiceGetBrandByIdKeyFn({ id }), queryFn: () => BrandsService.getBrandById({ id }) });
export const ensureUseGeolocationServiceGetCityByCoordinatesData = (queryClient: QueryClient, { lat, lon }: {
  lat: number;
  lon: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGeolocationServiceGetCityByCoordinatesKeyFn({ lat, lon }), queryFn: () => GeolocationService.getCityByCoordinates({ lat, lon }) });
export const ensureUseBannersServiceGetBannersData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseBannersServiceGetBannersKeyFn(), queryFn: () => BannersService.getBanners() });
