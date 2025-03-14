"use client";
import AppText from "@/src/components/AppText/AppText";
import { useCategoriesServiceGetAllCategoriesSuspense } from "@/src/openapi/queries/suspense";
import { GetAllCategoriesResponse } from "@/src/openapi/requests";
import { useItemsStore } from "@/src/store/items";
import { Button, Checkbox, Icon, Search, Wrapper } from "@mossoft/ui-kit";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useMemo, useState } from "react";

type Props = {
  initialData: GetAllCategoriesResponse;
};

const CategoriesTemplates = ({ initialData }: Props) => {
  const router = useRouter();
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);
  const { setSelectedIds } = useItemsStore();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data: categories } = useCategoriesServiceGetAllCategoriesSuspense(
    {},
    undefined,
    {
      initialData,
    }
  );

  const subCategories = useMemo(() => {
    if (categoryId) {
      return categories?.find((item) => item.id === categoryId)?.subCategories;
    }
    return categories.flatMap((category) => category.subCategories);
  }, [categories, categoryId]);

  const handleNavigate = (type: "bulk" | "single") => {
    if (!subCategoryIds.length)
      return enqueueSnackbar("Выберите подкатегорию", { variant: "error" });
    setSelectedIds([], "new", subCategoryIds);
    router.push(type === "bulk" ? "bulk" : "/");
  };

  const handleCheck = (id: number) => {
    if (subCategoryIds.includes(id)) {
      setSubCategoryIds(subCategoryIds.filter((item) => item !== id));
      return;
    }
    setSubCategoryIds([...subCategoryIds, id]);
  };

  return (
    <Wrapper className="relative h-[calc(100vh-120px)] mt-5 overflow-hidden flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
          <AppText className="text-black font-semibold">
            Выберите категорию
          </AppText>
          <AppText className="text-gray">
            Укажите категорию и подкатегорию, к которым относится Ваш товар
          </AppText>
        </div>
        <Search
          placeholder="Введите название категории"
          setValue={() => ""}
          value=""
          className="!rounded-lg"
        />
      </div>

      <div className="flex-grow min-h-0 p-2 flex flex-row mt-2 justify-between border-primary border-[1px] rounded-lg">
        <div className="flex w-1/2 flex-col gap-1 overflow-y-scroll">
          <AppText className="font-semibold text-lg items-center flex px-2 py-2">
            Все категории
          </AppText>
          {categories?.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                categoryId && categoryId === category.id
                  ? setCategoryId(null)
                  : setCategoryId(category.id);
              }}
              className={`${
                categoryId === category.id ? "bg-primary-light" : ""
              } flex px-2 mr-2 items-center py-2 justify-between flex-row gap-2 hover:bg-primary-light cursor-pointer rounded-[10px]`}
            >
              <AppText className="font-normal">{category.name}</AppText>
              <Icon
                name="arrow-left"
                className="w-6 h-6 text-primary rotate-180"
              />
            </div>
          ))}
        </div>

        {subCategories?.length ? (
          <AnimatePresence>
            <div className="flex flex-col gap-1 w-1/2 px-2 overflow-y-scroll">
              <AppText className="font-semibold text-lg items-center flex px-2 py-2">
                {categories?.find(({ id }) => id === categoryId)?.name ||
                  "Все подкатегории"}
              </AppText>
              {subCategories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCheck(item.id)}
                  className="px-2 items-center py-2 cursor-pointer rounded-[10px] flex flex-row gap-2"
                >
                  <input
                    onChange={() => {}}
                    type="checkbox"
                    checked={!!subCategoryIds.includes(item.id)}
                    className="w-5 h-5 border border-gray-400 rounded-md transition-all duration-300 bg-primary checked:bg-primary checked:ring-primary focus:outline-none"
                  />
                  <AppText className="font-normal">{item.name}</AppText>
                </div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <AppText className="m-auto">Подкатегорий не найдено</AppText>
        )}
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <AppText>Выбрано подкатегорий: {subCategoryIds.length}</AppText>

        <div className="flex gap-2 bg-white">
          <Button
            className="!w-fit !p-2 !text-base !rounded-xl !normal-case"
            variant="secondary"
            disabled={!subCategoryIds.length}
            onClick={() => handleNavigate("single")}
          >
            <Icon name="plus" className="mr-2 w-6 h-6" />
            Добавить товар
          </Button>

          <Button
            className="!w-fit !p-2 !text-base !rounded-xl !normal-case"
            variant="primary"
            disabled={!subCategoryIds.length}
            onClick={() => handleNavigate("bulk")}
          >
            <Icon name="upload" className="mr-2 w-6 h-6" />
            Добавить массово
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoriesTemplates;
