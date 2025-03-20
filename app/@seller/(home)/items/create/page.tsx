"use client";
import AppText from "@/src/components/AppText/AppText";
import TextEdit from "@/src/components/TextEdit/TextEdit";
import {
  useCategoriesServiceGetAllCategories,
  useCategoriesServiceGetSubCategoryById,
  useFileUploadServiceUploadItemsMedia,
  useItemServiceCreateItem,
} from "@/src/openapi/queries";
import { CreateItemDto } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { Button, Icon, Input, Select, Wrapper } from "@mossoft/ui-kit";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm, useWatch } from "react-hook-form";

type ItemForm = CreateItemDto & {
  categoryId: number;
};

type Props = {};

const Page = () => {
  const { data: categories } = useCategoriesServiceGetAllCategories();
  const { mutateAsync: createItem, isPending } = useItemServiceCreateItem();
  const { reset, handleSubmit, control } = useForm<ItemForm>();
  const { categoryId, subCategoryId } = useWatch({ control });

  const { mutateAsync: uploadMedia, isPending: isPendingMedia } =
    useFileUploadServiceUploadItemsMedia();

  const { data: subCategory, isPending: isPendingSchema } =
    useCategoriesServiceGetSubCategoryById({ id: subCategoryId! }, undefined, {
      enabled: !!subCategoryId,
    });

  console.log(subCategory);

  const onSubmit = async (requestBody: ItemForm) => {
    try {
      const res = await createItem({ requestBody });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  console.log(
    categories
      ?.find((item) => item.id === +categoryId!)
      ?.subCategories.map((item) => ({
        label: item.name,
        value: item.id,
      }))
  );

  const fieldClassName =
    "!border-[1px] !border-[#B0B0B0] focus:border-primary outline-none";
  const fieldLabelClassName = "!text-[#676767] focus:!text-primary";
  const rowsClassName = "flex flex-col gap-5 mt-4";
  const columnsClassName = "flex flex-row gap-4";

  return (
    <div className="flex flex-row gap-5 mt-4 max-w-[1440px] mx-auto">
      <Wrapper className="h-fit w-fit whitespace-nowrap">
        <div className="flex flex-row justify-between gap-5">
          <AppText>Карточек в группе</AppText>
          <AppText className="text-primary">0/10</AppText>
        </div>
      </Wrapper>

      <Wrapper className="w-full !p-7">
        <div
          className={
            "flex lg:flex-row flex-col gap-4 lg:items-start items-center"
          }
        >
          <label
            htmlFor="media"
            className="min-w-[260px] cursor-pointer w-[260px] min-h-[360px] max-h-[360px] bg-primary-light rounded-2xl relative"
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center hover:opacity-70">
              <Icon name="plus" className="w-10 h-10 !text-primary" />
              <AppText className="text-primary whitespace-nowrap">
                Добавьте фото или видео
              </AppText>
            </div>
            <input multiple hidden id="media" type="file" />
          </label>

          <div>
            <div className="flex flex-col gap-5">
              <AppText className="text-2xl text-black font-bold">
                Основная информация
              </AppText>
              <div className={columnsClassName}>
                <Controller
                  name="name"
                  rules={{
                    maxLength: { value: 20, message: "Максимум 20 символов" },
                    required: "Заполните поле",
                  }}
                  control={control}
                  render={(inputField) => (
                    <Input
                      {...inputField}
                      label="Название"
                      labelClassName={fieldLabelClassName}
                      className={fieldClassName}
                      placeholder="Введите название"
                    />
                  )}
                />
                <Controller
                  name="type"
                  rules={{
                    maxLength: { value: 20, message: "Максимум 20 символов" },
                    required: "Заполните поле",
                  }}
                  control={control}
                  render={(inputField) => (
                    <Input
                      {...inputField}
                      label="Тип"
                      className={fieldClassName}
                      labelClassName={fieldLabelClassName}
                      placeholder="Введите тип"
                    />
                  )}
                />
              </div>
              <Controller
                name="sellerArticle"
                control={control}
                rules={{
                  maxLength: { value: 10, message: "Максимум 10 символов" },
                  required: "Заполните поле",
                }}
                render={(inputField) => (
                  <Input
                    {...inputField}
                    label="Артикул поставщика"
                    labelClassName={fieldLabelClassName}
                    className={fieldClassName}
                    placeholder="Введите уникальный артикул"
                  />
                )}
              />
              <div className={columnsClassName}>
                <Controller
                  name="countryOfOrigin"
                  control={control}
                  rules={{
                    maxLength: { value: 20, message: "Максимум 20 символов" },
                    required: "Заполните поле",
                  }}
                  render={(inputField) => (
                    <Input
                      {...inputField}
                      type="text"
                      label="Страна производства"
                      labelClassName={fieldLabelClassName}
                      className={fieldClassName}
                      placeholder="Введите страну"
                    />
                  )}
                />
                <Controller
                  name="brand"
                  rules={{
                    maxLength: { value: 20, message: "Максимум 20 символов" },
                    required: "Заполните поле",
                  }}
                  control={control}
                  render={(inputField) => (
                    <Input
                      {...inputField}
                      type="text"
                      label="Бренд"
                      labelClassName={fieldLabelClassName}
                      className={fieldClassName}
                      placeholder="Введите бренд"
                    />
                  )}
                />
              </div>
              <div className={columnsClassName}>
                <Controller
                  name="categoryId"
                  rules={{ required: "Заполните поле" }}
                  control={control}
                  render={(inputField) => (
                    <Select
                      options={
                        categories?.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) || []
                      }
                      {...inputField}
                      label="Категория"
                      labelClassName={fieldLabelClassName}
                      className={fieldClassName}
                      placeholder="Выберите категорию"
                    />
                  )}
                />
                <Controller
                  name="subCategoryId"
                  rules={{ required: "Заполните поле" }}
                  control={control}
                  render={(inputField) => (
                    <Select
                      options={
                        categories
                          ?.find((item) => item.id === +categoryId!)
                          ?.subCategories.map((item) => ({
                            label: item.name,
                            value: item.id,
                          })) || []
                      }
                      disabled={!categoryId}
                      {...inputField}
                      label="Подкатегория"
                      labelClassName={fieldLabelClassName}
                      className={fieldClassName}
                      placeholder="Выберите подкатегорию"
                    />
                  )}
                />
              </div>
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: { value: 100, message: "Максимум 100 символов" },
                }}
                render={({ field: { value, onChange } }) => (
                  <TextEdit
                    label="Описание магазина"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className={rowsClassName}>
              <AppText className="text-2xl text-black font-bold">Цены</AppText>

              <div className={columnsClassName}>
                <Controller
                  name="price"
                  rules={{
                    maxLength: { value: 10, message: "Максимум 10 символов" },
                    required: "Заполните поле",
                  }}
                  control={control}
                  render={(inputField) => (
                    <Input
                      label="Цена"
                      postfix="₽"
                      type="number"
                      placeholder="Введите цену"
                      labelClassName={fieldLabelClassName}
                      parentClassName={fieldClassName}
                      className="!border-none outline-none"
                      {...inputField}
                    />
                  )}
                />
                <Controller
                  name="maxDiscount"
                  rules={{
                    maxLength: { value: 3, message: "Максимум 3 символa" },
                    max: { value: 100, message: "Максимум 100%" },
                    required: "Заполните поле",
                  }}
                  control={control}
                  render={(inputField) => (
                    <Input
                      postfix="%"
                      max={100}
                      maxLength={3}
                      type="number"
                      labelClassName={fieldLabelClassName}
                      parentClassName={fieldClassName}
                      className="!border-none outline-none"
                      label="Максимальная скидка, %"
                      placeholder="Введите скидку"
                      {...inputField}
                    />
                  )}
                />
              </div>
              <div className={columnsClassName}>
                <Controller
                  name="discountStepQuantity"
                  control={control}
                  render={(inputField) => (
                    <Input
                      postfix="%"
                      type="number"
                      label="Шаг для скидки за шт, %"
                      placeholder="Введите скидку"
                      labelClassName={fieldLabelClassName}
                      parentClassName={fieldClassName}
                      className="!border-none outline-none"
                      {...inputField}
                    />
                  )}
                />
                <Controller
                  name="discountPerStep"
                  control={control}
                  render={(inputField) => (
                    <Input
                      postfix="%"
                      labelClassName={fieldLabelClassName}
                      parentClassName={fieldClassName}
                      className="!border-none outline-none"
                      type="number"
                      label="Скидка за шаг, %"
                      placeholder="Введите скидку"
                      {...inputField}
                    />
                  )}
                />
              </div>
            </div>
            {!!subCategory?.fieldsSchema.length && (
              <div className={rowsClassName}>
                <AppText className="text-2xl text-black font-bold">
                  Характеристики
                </AppText>
                <div className="grid grid-cols-2 gap-5 w-full">
                  {subCategory?.fieldsSchema?.map((item, index, array) => (
                    <Controller
                      key={item.key}
                      name={`fields.${item.key}`}
                      control={control}
                      render={(inputField) => (
                        <div
                          className={
                            array.length % 2 !== 0 && index === array.length - 1
                              ? "col-span-2"
                              : ""
                          }
                        >
                          <Input
                            label={item.key}
                            labelClassName={fieldLabelClassName}
                            className={fieldClassName}
                            parentClassName={
                              item.type === "string"
                                ? ""
                                : "outline-none border-none"
                            }
                            placeholder={"Введите " + item.key}
                            type={item.type === "string" ? "text" : "number"}
                            {...inputField}
                          />
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrapper>

      <Button
        variant="primary"
        className="!px-4 !py-2 !w-fit whitespace-nowrap !normal-case"
        onClick={handleSubmit(onSubmit)}
      >
        Сохранить и продолжить
      </Button>
    </div>
  );
};

export default Page;
