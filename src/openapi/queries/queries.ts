// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthService, BannersService, BasketService, BrandsService, CardsService, CategoriesService, CompaniesService, DaDataService, FileUploadService, GeolocationService, ItemService, ShopService, UsersService } from "../requests/services.gen";
import { CompaniesDto, CreateBrandDto, CreateCategoryDto, CreateItemDto, CreateShopDto, CreateSubCategoryDto, LoginUserDto, RegisterUserDto, UpdateItemDto, UpdateShopDto, UsersPatchDto } from "../requests/types.gen";
import * as Common from "./common";
export const useUsersServiceFindAll = <TData = Common.UsersServiceFindAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceFindAllKeyFn(queryKey), queryFn: () => UsersService.findAll() as TData, ...options });
export const useUsersServiceGetMe = <TData = Common.UsersServiceGetMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetMeKeyFn(queryKey), queryFn: () => UsersService.getMe() as TData, ...options });
export const useUsersServiceGetById = <TData = Common.UsersServiceGetByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getById({ id }) as TData, ...options });
export const useCompaniesServiceGetAllCompanies = <TData = Common.CompaniesServiceGetAllCompaniesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCompaniesServiceGetAllCompaniesKeyFn(queryKey), queryFn: () => CompaniesService.getAllCompanies() as TData, ...options });
export const useCompaniesServiceGetMyCompany = <TData = Common.CompaniesServiceGetMyCompanyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCompaniesServiceGetMyCompanyKeyFn(queryKey), queryFn: () => CompaniesService.getMyCompany() as TData, ...options });
export const useShopServiceGetMyShop = <TData = Common.ShopServiceGetMyShopDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseShopServiceGetMyShopKeyFn(queryKey), queryFn: () => ShopService.getMyShop() as TData, ...options });
export const useShopServiceGetAllShops = <TData = Common.ShopServiceGetAllShopsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseShopServiceGetAllShopsKeyFn(queryKey), queryFn: () => ShopService.getAllShops() as TData, ...options });
export const useCategoriesServiceGetAllCategories = <TData = Common.CategoriesServiceGetAllCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ isPopular }: {
  isPopular?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCategoriesServiceGetAllCategoriesKeyFn({ isPopular }, queryKey), queryFn: () => CategoriesService.getAllCategories({ isPopular }) as TData, ...options });
export const useCategoriesServiceGetPopularCategories = <TData = Common.CategoriesServiceGetPopularCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCategoriesServiceGetPopularCategoriesKeyFn(queryKey), queryFn: () => CategoriesService.getPopularCategories() as TData, ...options });
export const useCategoriesServiceGetSubCategoryById = <TData = Common.CategoriesServiceGetSubCategoryByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCategoriesServiceGetSubCategoryByIdKeyFn({ id }, queryKey), queryFn: () => CategoriesService.getSubCategoryById({ id }) as TData, ...options });
export const useItemServiceGetAllItems = <TData = Common.ItemServiceGetAllItemsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseItemServiceGetAllItemsKeyFn(queryKey), queryFn: () => ItemService.getAllItems() as TData, ...options });
export const useItemServiceGetById = <TData = Common.ItemServiceGetByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseItemServiceGetByIdKeyFn(queryKey), queryFn: () => ItemService.getById() as TData, ...options });
export const useBasketServiceGetMyBasket = <TData = Common.BasketServiceGetMyBasketDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBasketServiceGetMyBasketKeyFn(queryKey), queryFn: () => BasketService.getMyBasket() as TData, ...options });
export const useBasketServiceGetTotalItemsInBasket = <TData = Common.BasketServiceGetTotalItemsInBasketDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBasketServiceGetTotalItemsInBasketKeyFn(queryKey), queryFn: () => BasketService.getTotalItemsInBasket() as TData, ...options });
export const useDaDataServiceGetParty = <TData = Common.DaDataServiceGetPartyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ query }: {
  query: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDaDataServiceGetPartyKeyFn({ query }, queryKey), queryFn: () => DaDataService.getParty({ query }) as TData, ...options });
export const useCardsServiceGetAllCards = <TData = Common.CardsServiceGetAllCardsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ q }: {
  q?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCardsServiceGetAllCardsKeyFn({ q }, queryKey), queryFn: () => CardsService.getAllCards({ q }) as TData, ...options });
export const useBrandsServiceGetBrands = <TData = Common.BrandsServiceGetBrandsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBrandsServiceGetBrandsKeyFn(queryKey), queryFn: () => BrandsService.getBrands() as TData, ...options });
export const useBrandsServiceGetBrandById = <TData = Common.BrandsServiceGetBrandByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBrandsServiceGetBrandByIdKeyFn({ id }, queryKey), queryFn: () => BrandsService.getBrandById({ id }) as TData, ...options });
export const useGeolocationServiceGetCityByCoordinates = <TData = Common.GeolocationServiceGetCityByCoordinatesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ lat, lon }: {
  lat: number;
  lon: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGeolocationServiceGetCityByCoordinatesKeyFn({ lat, lon }, queryKey), queryFn: () => GeolocationService.getCityByCoordinates({ lat, lon }) as TData, ...options });
export const useBannersServiceGetBanners = <TData = Common.BannersServiceGetBannersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBannersServiceGetBannersKeyFn(queryKey), queryFn: () => BannersService.getBanners() as TData, ...options });
export const useAuthServiceRegister = <TData = Common.AuthServiceRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RegisterUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RegisterUserDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.register({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServiceSendSms = <TData = Common.AuthServiceSendSmsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.sendSms() as unknown as Promise<TData>, ...options });
export const useAuthServiceLogin = <TData = Common.AuthServiceLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LoginUserDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LoginUserDto;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.login({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServiceRefreshToken = <TData = Common.AuthServiceRefreshTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.refreshToken() as unknown as Promise<TData>, ...options });
export const useAuthServiceLogout = <TData = Common.AuthServiceLogoutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.logout() as unknown as Promise<TData>, ...options });
export const useCompaniesServiceCreate = <TData = Common.CompaniesServiceCreateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CompaniesDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CompaniesDto;
}, TContext>({ mutationFn: ({ requestBody }) => CompaniesService.create({ requestBody }) as unknown as Promise<TData>, ...options });
export const useShopServiceCreateShop = <TData = Common.ShopServiceCreateShopMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateShopDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateShopDto;
}, TContext>({ mutationFn: ({ requestBody }) => ShopService.createShop({ requestBody }) as unknown as Promise<TData>, ...options });
export const useCategoriesServiceCreateCategory = <TData = Common.CategoriesServiceCreateCategoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateCategoryDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateCategoryDto;
}, TContext>({ mutationFn: ({ requestBody }) => CategoriesService.createCategory({ requestBody }) as unknown as Promise<TData>, ...options });
export const useCategoriesServiceCreateSubCategory = <TData = Common.CategoriesServiceCreateSubCategoryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  parentId: number;
  requestBody: CreateSubCategoryDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  parentId: number;
  requestBody: CreateSubCategoryDto;
}, TContext>({ mutationFn: ({ parentId, requestBody }) => CategoriesService.createSubCategory({ parentId, requestBody }) as unknown as Promise<TData>, ...options });
export const useItemServiceCreateItem = <TData = Common.ItemServiceCreateItemMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  brandId: number;
  cardId: number;
  requestBody: CreateItemDto;
  subCategoryId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  brandId: number;
  cardId: number;
  requestBody: CreateItemDto;
  subCategoryId: number;
}, TContext>({ mutationFn: ({ brandId, cardId, requestBody, subCategoryId }) => ItemService.createItem({ brandId, cardId, requestBody, subCategoryId }) as unknown as Promise<TData>, ...options });
export const useFileUploadServiceUploadItemsImages = <TData = Common.FileUploadServiceUploadItemsImagesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { images?: (Blob | File)[]; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { images?: (Blob | File)[]; };
}, TContext>({ mutationFn: ({ formData }) => FileUploadService.uploadItemsImages({ formData }) as unknown as Promise<TData>, ...options });
export const useFileUploadServiceUploadBanner = <TData = Common.FileUploadServiceUploadBannerMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { file?: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { file?: Blob | File; };
}, TContext>({ mutationFn: ({ formData }) => FileUploadService.uploadBanner({ formData }) as unknown as Promise<TData>, ...options });
export const useFileUploadServiceUploadShopImages = <TData = Common.FileUploadServiceUploadShopImagesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { image?: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { image?: Blob | File; };
}, TContext>({ mutationFn: ({ formData }) => FileUploadService.uploadShopImages({ formData }) as unknown as Promise<TData>, ...options });
export const useFileUploadServiceUploadItemsexcel = <TData = Common.FileUploadServiceUploadItemsexcelMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { file?: Blob | File; };
  subCategoryId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { file?: Blob | File; };
  subCategoryId: number;
}, TContext>({ mutationFn: ({ formData, subCategoryId }) => FileUploadService.uploadItemsexcel({ formData, subCategoryId }) as unknown as Promise<TData>, ...options });
export const useBasketServiceAddItemToBasket = <TData = Common.BasketServiceAddItemToBasketMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  itemId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  itemId: number;
}, TContext>({ mutationFn: ({ itemId }) => BasketService.addItemToBasket({ itemId }) as unknown as Promise<TData>, ...options });
export const useBrandsServiceCreateBrand = <TData = Common.BrandsServiceCreateBrandMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateBrandDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateBrandDto;
}, TContext>({ mutationFn: ({ requestBody }) => BrandsService.createBrand({ requestBody }) as unknown as Promise<TData>, ...options });
export const useUsersServiceChangeUserRole = <TData = Common.UsersServiceChangeUserRoleMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UsersPatchDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UsersPatchDto;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.changeUserRole({ requestBody }) as unknown as Promise<TData>, ...options });
export const useShopServiceUpdateShop = <TData = Common.ShopServiceUpdateShopMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UpdateShopDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UpdateShopDto;
}, TContext>({ mutationFn: ({ requestBody }) => ShopService.updateShop({ requestBody }) as unknown as Promise<TData>, ...options });
export const useItemServiceUpdateItem = <TData = Common.ItemServiceUpdateItemMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: UpdateItemDto;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: UpdateItemDto;
}, TContext>({ mutationFn: ({ id, requestBody }) => ItemService.updateItem({ id, requestBody }) as unknown as Promise<TData>, ...options });
export const useCompaniesServiceDeleteMyCompany = <TData = Common.CompaniesServiceDeleteMyCompanyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => CompaniesService.deleteMyCompany() as unknown as Promise<TData>, ...options });
export const useCategoriesServiceDeleteAllCategories = <TData = Common.CategoriesServiceDeleteAllCategoriesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => CategoriesService.deleteAllCategories() as unknown as Promise<TData>, ...options });
export const useCategoriesServiceDeleteCategoryById = <TData = Common.CategoriesServiceDeleteCategoryByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CategoriesService.deleteCategoryById({ id }) as unknown as Promise<TData>, ...options });
export const useItemServiceDeleteById = <TData = Common.ItemServiceDeleteByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => ItemService.deleteById({ id }) as unknown as Promise<TData>, ...options });
export const useBrandsServiceDeleteBrand = <TData = Common.BrandsServiceDeleteBrandMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => BrandsService.deleteBrand() as unknown as Promise<TData>, ...options });
