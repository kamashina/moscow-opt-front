"use client";
import { getQueryClient } from "@/src/api/api";
import {
  useItemServiceDeleteItemsByIds,
  useItemServiceGetItemsByMyShopKey,
} from "@/src/openapi/queries";
import { useItemsStore } from "@/src/store/items";
import { Exception } from "@/src/types";
import { Button, Loader, Search } from "@mossoft/ui-kit";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useQueryState } from "nuqs";
import plural from "plural-ru";
import { Dispatch, ReactNode, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AppText from "../AppText/AppText";

type ItemCard = { id: number; subCategoryId: number };

type Props<T> = {
  infiniteData: UseInfiniteQueryResult<InfiniteData<T[], unknown>, Error>;
  renderItem: (
    item: T,
    index: number,
    isChecked: boolean,
    setCheckedItems: Dispatch<React.SetStateAction<ItemCard[]>>
  ) => ReactNode;
};

const HEADER_OPTIONS_LABEL = [
  "Артикул площадки",
  "Рейтинг",
  "Остаток",
  "Дропшиппинг",
  "Коробка",
  "Кастомная коробка",
  "Цена",
  "Шаг для скидки за шт",
  "Скидка за шаг",
  "Максимальная скидка",
  "Страна производства",
  "Дата создания",
];

const InfiniteTable = <T extends { id: number; subCategory: { id: number } }>({
  infiniteData,
  renderItem,
}: Props<T>) => {
  const queryClient = getQueryClient();
  const { mutateAsync: deleteItems } = useItemServiceDeleteItemsByIds({
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [useItemServiceGetItemsByMyShopKey],
      });
    },
  });
  const { setSelectedIds } = useItemsStore();
  const { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, data } =
    infiniteData;

  const [checkedItems, setCheckedItems] = useState<
    { id: number; subCategoryId: number }[]
  >([]);

  const [search, setSearch] = useQueryState("q");
  const router = useRouter();
  const { ref, inView } = useInView();

  const flattenPages = data?.pages.flatMap((page) => page);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const handleCheckItems = () => {
    if (!flattenPages?.length) return;

    setCheckedItems((prev) => {
      console.log(prev.length === flattenPages.length);

      return prev.length === flattenPages.length || prev.length >= 100
        ? []
        : flattenPages
            .map((item) => ({
              id: item.id,
              subCategoryId: item.subCategory.id,
            }))
            .splice(0, 100);
    });
  };

  const memoizedSetCheckedItems = useCallback(
    (value: ItemCard[] | ((prev: ItemCard[]) => ItemCard[])) => {
      setCheckedItems(value);
    },
    []
  );

  const memoizedRenderItem = useCallback(
    (item: T, index: number) =>
      renderItem(
        item,
        index,
        checkedItems.map((item) => item.id).includes(item.id),
        memoizedSetCheckedItems
      ),
    [checkedItems, renderItem]
  );

  const handleDelete = async () => {
    try {
      if (window.confirm("Вы действительно хотите удалить выбранные товары?")) {
        const res = await deleteItems({
          ids: checkedItems.map(({ id }) => id),
        });
        enqueueSnackbar(
          `${plural(checkedItems.length, "Удален", "Удалено")} ${
            checkedItems.length
          } ${plural(checkedItems.length, "товар", "товара", "товаров")}`,
          { variant: "success" }
        );
        setCheckedItems([]);
      }
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const handleEdit = () => {
    const ids = checkedItems.map(({ id }) => id);
    const subCategoryIds = checkedItems.map(
      ({ subCategoryId }) => subCategoryId
    );

    setSelectedIds(ids, "edit", subCategoryIds);

    router.push("/items/bulk");
  };

  const handleSearch = (search: string) => {
    if (!search) {
      setSearch(null);
      return;
    }
    setSearch(search);
  };

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="overflow-y-auto w-full h-[calc(100vh-200px)] relative">
        <table className="border-collapse table-auto w-full">
          <thead className="sticky top-0 bg-white w-full">
            <tr>
              <th className="p-4 w-full min-w-max">
                <input
                  type="checkbox"
                  onChange={handleCheckItems}
                  checked={checkedItems.length === flattenPages?.length}
                  className="w-5 h-5 border border-gray-400 rounded-md transition-all duration-300 bg-primary checked:bg-primary checked:ring-primary focus:outline-none"
                />
              </th>
              <th>
                <Search
                  setValue={handleSearch}
                  value={search ? search : ""}
                  className="!rounded-xl !w-[330px] px-10"
                  placeholder="Артикул, название, бренд"
                />
              </th>
              {HEADER_OPTIONS_LABEL.map((label) => (
                <th key={label} className="min-w-full whitespace-nowrap">
                  <div className="w-[250px]">
                    <AppText className="font-semibold">{label}</AppText>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!!flattenPages?.length ? (
              <>
                {flattenPages.map((item, index) =>
                  memoizedRenderItem(item, index)
                )}
                <tr ref={ref} className="h-4"></tr>
              </>
            ) : isLoading ? (
              <tr>
                <td colSpan={7}>
                  <Loader style={{ width: "60px", height: "60px" }} />
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={20}
                  className="px-2 py-2 min-w-full text-center align-middle"
                >
                  <div className="w-[300px] font-semibold">
                    <AppText className="w-[300px]">Ничего не найдено</AppText>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!!checkedItems.length && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-2xl flex justify-between items-center z-50 flex-col">
          <AppText className="text-lg font-medium">
            {plural(checkedItems.length, "Выбран", "Выбрано")}{" "}
            {checkedItems.length}{" "}
            {plural(checkedItems.length, "товар", "товара", "товаров")}
          </AppText>
          <div className="flex flex-riw gap-4">
            <Button
              variant="link"
              className="!px-4 !py-2 !text-primary rounded-lg"
              onClick={handleEdit}
            >
              Редактировать
            </Button>
            <Button
              variant="link"
              className="!px-4 !py-2 !text-danger"
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteTable;
