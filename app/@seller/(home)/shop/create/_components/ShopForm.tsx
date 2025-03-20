"use client";
import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import SelectSearch from "@/src/components/SelectSearch/SelectSearch";
import TextEdit from "@/src/components/TextEdit/TextEdit";
import { getServerFile } from "@/src/constants";
import {
  useCompaniesServiceGetMyCompanyKey,
  useFileUploadServiceUploadShopBanner,
  useFileUploadServiceUploadShopImages,
  useShopServiceCreateShop,
  useUsersServiceGetMeKey,
} from "@/src/openapi/queries";
import { CreateShopDto, DaDataService } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { Button, Icon, Input, Wrapper } from "@mossoft/ui-kit";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const ShopForm = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const {
    mutate: getAddress,
    data: addresses,
    isPending: isAddressLoading,
  } = useMutation({
    mutationFn: DaDataService.getAddress,
  });

  const onSearchAddress = (q: string) => {
    if (!q) return;
    try {
      getAddress({ q });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const { mutateAsync: createShop } = useShopServiceCreateShop({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [useCompaniesServiceGetMyCompanyKey],
      });
    },
  });
  const { control, handleSubmit, setValue, reset } = useForm<CreateShopDto>();
  const { mutateAsync: uploadBanner } = useFileUploadServiceUploadShopBanner();
  const { mutateAsync: uploadLogo } = useFileUploadServiceUploadShopImages();

  const onSubmit = async (data: CreateShopDto) => {
    try {
      const res = await createShop({ requestBody: { ...data, rate: "no" } });
      router.push("/");
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const onUploadBanner = async (file: File) => {
    try {
      const res = await uploadBanner({ formData: { file } });
      setValue("banner", res?.imagePath);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const { banner, logo } = useWatch({ control });

  const onUploadLogo = async (image: File) => {
    try {
      const res = await uploadLogo({ formData: { image } });
      setValue("logo", res?.imagePath);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[500px] mx-auto mt-10">
      <div className="bg-white h-[70px] items-center flex justify-center rounded-[25px]">
        <AppText className="text-lg">Создание магазина</AppText>
      </div>

      <Wrapper className="!p-0">
        <label htmlFor="upload-file-banner" className="cursor-pointer">
          <input
            id="upload-file-banner"
            type="file"
            accept="image/jpeg"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onUploadBanner(e.target.files![0])
            }
          />
          <div className="relative w-[500px] h-[100px] top-0">
            {!banner && (
              <AppText className="absolute text-sm text-center top-[30px] opacity-60 text-white z-10 left-10">
                <p>Добавить обложку</p> 1440 x 260 px
              </AppText>
            )}
            <Image
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={
                banner
                  ? getServerFile(banner)
                  : "/images/create_shop_header.svg"
              }
              priority
              className="bg-[#6057DC] rounded-t-[25px]"
              fill
              alt="shop_create_logo"
            />
            {!banner && (
              <AppText className="absolute text-center text-sm top-[30px] opacity-60 text-white z-10 right-10">
                <p>Добавить обложку</p>
                1440 x 260 px
              </AppText>
            )}
          </div>
        </label>

        <label htmlFor="upload-file-logo">
          <input
            id="upload-file-logo"
            type="file"
            accept="image/jpeg"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onUploadLogo(e.target.files![0])
            }
          />
          <div className="flex flex-col items-center mt-[-50px]">
            <div className="p-1 bg-white relative mx-auto w-[100px] flex items-center text-center h-[100px] rounded-full">
              {logo ? (
                <div className="h-full w-full cursor-pointer relative">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100%"
                    className="rounded-full w-[50px] h-[50px]"
                    src={getServerFile(logo)}
                    alt="logo"
                  />
                </div>
              ) : (
                <div className="bg-primary-light rounded-full h-full w-full flex items-center justify-center cursor-pointer">
                  <Icon
                    name="file"
                    className="w-[50px] h-[50px] text-primary"
                  />
                </div>
              )}
            </div>
            {!logo && (
              <AppText className="text-primary relative">
                Добавить логотип
              </AppText>
            )}
          </div>
        </label>

        <div className="flex flex-col gap-2 px-5 pb-5">
          <Controller
            name="name"
            defaultValue=""
            rules={{
              required: "Заполните поле",
              minLength: {
                value: 3,
                message: "Мин кол-во символов 3",
              },
            }}
            control={control}
            render={(inputFields) => (
              <Input
                label="Название магазина"
                placeholder="Введите название"
                className="!border-gray"
                labelClassName="!text-black"
                type="text"
                {...inputFields}
              />
            )}
          />
          <Controller
            name="address"
            defaultValue=""
            control={control}
            rules={{ required: "Заполните поле" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <SelectSearch
                label="Адрес"
                error={error}
                className="!border-gray"
                onSelectOption={(data) => setValue("address", data?.result)}
                placeholder="Введите адрес"
                isLoading={isAddressLoading}
                options={
                  addresses?.map((address) => ({
                    ...address,
                    label: address.result,
                    value: address.result,
                  })) || []
                }
                onSearch={onSearchAddress}
                onChange={(value) => onChange(value)}
                value={value?.toString()}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextEdit
                label="Описание магазина"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button
            variant="link"
            className="bg-primary !py-2 !w-full text-white"
            onClick={handleSubmit(onSubmit)}
          >
            Создать
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default ShopForm;
