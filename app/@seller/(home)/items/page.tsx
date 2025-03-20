"use client";
import AppText from "@/src/components/AppText/AppText";
import InfiniteTable from "@/src/components/InfiniteTable/InfiniteTable";
import Select from "@/src/components/Select/Select";
import { LIMIT } from "@/src/constants";
import { useItemServiceGetItemsByMyShopKey } from "@/src/openapi/queries";
import {
  GetItemsByMyShopResponse,
  ItemService,
  itemStatus,
} from "@/src/openapi/requests";
import { Wrapper } from "@mossoft/ui-kit";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import SellerItemCard from "./_components/SellerItemCard";

const SORT_OPTIONS: Array<{ label: string; value: itemStatus | null }> = [
  {
    label: "Все",
    value: null,
  },
  {
    label: "Активные",
    value: "active",
  },
  {
    label: "С ошибками",
    value: "reject",
  },
  {
    label: "Черновик",
    value: "draft",
  },
];

const Page = () => {
  const router = useRouter();
  const [sort, setSort] = useQueryState("by");

  const [search, setSearch] = useQueryState("q");
  const infiniteData = useInfiniteQuery<
    GetItemsByMyShopResponse,
    DefaultError,
    InfiniteData<GetItemsByMyShopResponse>,
    [string, any],
    number
  >({
    queryKey: [
      useItemServiceGetItemsByMyShopKey,
      { limit: LIMIT, status: sort, search },
    ],
    initialPageParam: 0,
    queryFn: async ({ queryKey, pageParam }) =>
      await ItemService.getItemsByMyShop({
        ...queryKey[1],
        offset: pageParam,
        q: search,
        status: sort,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT
        ? (allPages.length - 1) * LIMIT + LIMIT
        : undefined,
  });
  return (
    <>
      <div className="flex flex-row gap-6 my-4 px-8 pt-4 pb-2">
        <Select
          label="Добавить товар"
          options={[
            {
              label: "Один товар",
              onClick: () => router.push("/items/create"),
              iconName: "singleBox",
            },
            {
              label: "Товар списком",
              onClick: () => router.push("/items/categories"),
              iconName: "bulkBox",
            },
          ]}
        />

        <div className="flex flex-row gap-4 items-center">
          {SORT_OPTIONS.map((item) => (
            <div
              onClick={() => setSort(item.value)}
              key={item.label}
              className={`px-3 py-2 cursor-pointer rounded-[25px] ${
                item.value === sort ? "bg-primary-light text-white" : ""
              }`}
            >
              <AppText>{item.label}</AppText>
            </div>
          ))}
        </div>
      </div>
      <Wrapper className="!px-0 !py-0 rounded-lg">
        <InfiniteTable
          infiniteData={infiniteData}
          renderItem={(item, _, isChecked, setCheckedItems) => (
            <SellerItemCard
              key={item.id}
              item={item}
              isChecked={isChecked}
              setCheckedItems={setCheckedItems}
            />
          )}
        />
      </Wrapper>
    </>
  );
};

export default Page;
