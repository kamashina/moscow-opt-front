"use client";

import { Button, Search, useDebounce } from "@mossoft/ui-kit";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { Dispatch, ReactNode, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

import AppText from "../AppText/AppText";
import { useStore } from "zustand";
import { useItemsStore } from "@/src/store/items";

type Props<T> = {
  infiniteData: UseInfiniteQueryResult<InfiniteData<T[], unknown>, Error>;
  className?: string;
  renderItem: (
    item: T,
    index: number,
    isChecked: boolean,
    setCheckedItems: Dispatch<React.SetStateAction<number[]>>
  ) => ReactNode;
  setSearch: (value: string) => void;
  search: string | null;
  iconClassName?: string;
  isScrollTopButton?: boolean;
};

const InfiniteTable = <T extends { id: number }>({
  infiniteData,
  renderItem,
  className,
  iconClassName,
  isScrollTopButton = true,
}: Props<T>) => {
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

  const handleCancel = () => {
    setCheckedItems([]);
  };

  const handleEdit = () => {
    setSelectedIds(checkedItems);
    router.push("/items/bulk");
  };

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-240px)] relative">
      <table className="w-screen border-collapse overflow-x-auto">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleCheckItems}
                checked={checkedItems.length === flattenPages?.length}
                title=""
              />
            </th>
            <th>
              <Search
                setValue={() => {}}
                value=""
                className="!rounded-xl"
                placeholder="Артикул, название, бренд"
              />
            </th>
            <th>
              <AppText>Артикул площадки</AppText>
            </th>
            <th>
              <AppText>Рейтинг</AppText>
            </th>
          </tr>
        </thead>
        {!!flattenPages?.length && (
          <tbody>
            {flattenPages.map((item, index) => memoizedRenderItem(item, index))}
            <tr
              ref={ref}
              className="h-4 flex mt-8 flex-row items-center justify-center"
            ></tr>
          </tbody>
        )}
      </table>

      {!!checkedItems.length && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-2xl flex justify-between items-center z-50 flex-col">
          <span className="text-lg font-medium">
            Выбрано {checkedItems.length} товаров
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
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteTable;
