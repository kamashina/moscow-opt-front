"use client";
import AppText from "@/src/components/AppText/AppText";
import InfiniteTable from "@/src/components/InfiniteTable/InfiniteTable";
import { LIMIT } from "@/src/constants";
import { useItemServiceGetItemsByMyShopKey } from "@/src/openapi/queries";
import {
  GetItemsByMyShopResponse,
  ItemService,
  itemStatus,
} from "@/src/openapi/requests";
import { Button, Wrapper } from "@mossoft/ui-kit";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import SellerItemCard from "./_components/SellerItemCard";

type Props = {};

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

const Page = (props: Props) => {
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
      { limit: LIMIT, status: sort },
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
    <Wrapper className="mt-4">
      <div className="flex flex-row gap-2 my-4">
        <Button
          onClick={() => {}}
          className="!px-2 !py-1 bg-primary rounded-[25px] text-white"
          variant="link"
        >
          Добавить товар
        </Button>
        {SORT_OPTIONS.map((item) => (
          <div
            onClick={() => setSort(item.value)}
            key={item.label}
            className="px-2 py-1 cursor-pointer bg-primary-light rounded-[25px]"
          >
            <AppText>{item.label}</AppText>
          </div>
        ))}
      </div>

      <InfiniteTable
        search={search}
        setSearch={setSearch}
        className="mt-2 overflow-y-auto h-[calc(100vh-300px)]"
        infiniteData={infiniteData}
        isScrollTopButton
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
  );
};

export default Page;
