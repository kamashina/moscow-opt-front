"use client";
import { Button, Loader, Search, useDebounce } from "@mossoft/ui-kit";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Dispatch, ReactNode, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import plural from "plural-ru";
import { getQueryClient } from "@/src/api/api";
import {
  useItemServiceDeleteItemsByIds,
  useItemServiceGetItemsByMyShopKey,
} from "@/src/openapi/queries";
import { useItemsStore } from "@/src/store/items";
import { Exception } from "@/src/types";
import { enqueueSnackbar } from "notistack";
import AppText from "../AppText/AppText";

type Props<T> = {
  infiniteData: UseInfiniteQueryResult<InfiniteData<T[], unknown>, Error>;
  renderItem: (
    item: T,
    index: number,
    isChecked: boolean,
    setCheckedItems: Dispatch<React.SetStateAction<number[]>>
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

const InfiniteTable = <T extends { id: number }>({
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

  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [search, setSearch] = useQueryState("q");
  const debounce = useDebounce(search!, 500);
  const router = useRouter();
  const { ref, inView } = useInView();

  useEffect(() => {
    setSearch(debounce);
  }, [search]);

  const flattenPages = data?.pages.flatMap((page) => page);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const handleCheckItems = useCallback(() => {
    if (!flattenPages?.length) return;
    setCheckedItems((prev) =>
      prev.length === flattenPages.length
        ? []
        : flattenPages.map((item) => item.id)
    );
  }, [flattenPages]);

  const memoizedSetCheckedItems = useCallback(
    (value: number[] | ((prev: number[]) => number[])) => {
      setCheckedItems(value);
    },
    []
  );

  const memoizedRenderItem = useCallback(
    (item: T, index: number) =>
      renderItem(
        item,
        index,
        checkedItems.includes(item.id),
        memoizedSetCheckedItems
      ),
    [checkedItems, renderItem]
  );

  const handleDelete = async () => {
    try {
      if (window.confirm("Вы действительно хотите удалить выбранные товары?")) {
        const res = await deleteItems({ ids: checkedItems });
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
    setSelectedIds(checkedItems, "edit");
    router.push("/items/bulk");
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-200px)]">
        <div className="flex justify-center items-center h-full">
          <Loader style={{ width: "60px", height: "60px" }} />
        </div>
      </div>
    );
  }
  if (!flattenPages?.length) {
    return (
      <div className="h-[calc(100vh-200px)]">
        <div className="flex justify-center items-center h-full">
          <AppText>Ничего не найдено</AppText>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="overflow-y-auto w-full h-[calc(100vh-200px)] relative">
        <table className="border-collapse table-auto w-full">
          <thead className="sticky top-0 bg-white w-full">
            <tr>
              <th className="px-2 py-4 min-w-full">
                <input
                  type="checkbox"
                  onChange={handleCheckItems}
                  checked={checkedItems.length === flattenPages?.length}
                  className="w-5 h-5 border border-gray-400 rounded-md transition-all duration-300 bg-primary checked:bg-primary checked:ring-primary focus:outline-none"
                />
              </th>
              <th className="min-w-max">
                <Search
                  setValue={setSearch}
                  value={search ?? ""}
                  className="!rounded-xl !max-w-[300px]"
                  placeholder="Артикул, название, бренд"
                />
              </th>
              {HEADER_OPTIONS_LABEL.map((label) => (
                <th key={label} className="min-w-full whitespace-nowrap">
                  <AppText className="font-semibold">{label}</AppText>
                </th>
              ))}
            </tr>
          </thead>

          {!!flattenPages?.length && (
            <tbody>
              {flattenPages.map((item, index) =>
                memoizedRenderItem(item, index)
              )}
              <tr ref={ref} className="h-4"></tr>
            </tbody>
          )}
        </table>
      </div>

      {!!checkedItems.length && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-2xl flex justify-between items-center z-50 flex-col">
          <span className="text-lg font-medium">
            {plural(checkedItems.length, "Выбран", "Выбрано")}{" "}
            {checkedItems.length}{" "}
            {plural(checkedItems.length, "товар", "товара", "товаров")}
          </span>
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
