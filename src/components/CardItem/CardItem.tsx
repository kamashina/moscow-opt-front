import { getQueryClient } from "@/src/api/api";
import { BOX_TYPES_TRANlSATIONS, priceSeparator } from "@/src/constants";
import {
  useCardsServiceGetAllCardsKey,
  useFavoritesServiceChangeFavorite,
} from "@/src/openapi/queries";
import { CardResponse } from "@/src/openapi/requests";
import { Icon } from "@mossoft/ui-kit";
import Link from "next/link";
import AppText from "../AppText/AppText";
import HoverSlider from "../HoverSlider/HoverSlider";
import ProductSchema from "../SEO/ProductSchema";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth";

type Props = {
  item: CardResponse;
};

const CardItem = ({ item }: Props) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const { isAuthenticated, clearUser } = useAuthStore();
  const { mutateAsync: changeIsFavorite } = useFavoritesServiceChangeFavorite({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [useCardsServiceGetAllCardsKey],
      });
    },
  });

  const handleChangeFavorite = async (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    try {
      const res = await changeIsFavorite({ cardId: item.id });
    } catch (e) {
      !isAuthenticated && router.push("?modal=auth", { scroll: false });
    }
  };

  const previewItem = item.preview;

  return (
    <>
      <ProductSchema
        name={previewItem.name}
        image={process.env.NEXT_PUBLIC_FILES_URL + previewItem.images?.[0]}
        description={
          previewItem.description || "Лучшие товары от проверенных поставщиков"
        }
        brand={previewItem.brand}
        price={previewItem.price}
        currency="RUB"
      />

      <Link className="flex flex-col" href={`/items/${item.id}`}>
        <div className="relative h-[300px] w-full">
          <div onClick={handleChangeFavorite} className="cursor-pointer">
            <Icon
              name="like"
              className={`w-8 h-8  ${
                item.isFavorite ? "!text-danger" : "!text-white"
              } absolute top-3 right-4 z-10`}
            />
          </div>
          <HoverSlider
            images={previewItem.images || ["/images/itemsPlaceholder.png"]}
          />
        </div>

        <div className="mt-1">
          <div className="flex flex-row justify-between">
            <div className="px-2 py-1 bg-primary-light rounded-3xl flex items-center">
              <AppText className="text-primary text-xs">
                {previewItem.box?.type &&
                  BOX_TYPES_TRANlSATIONS[previewItem.box?.type]}
              </AppText>
            </div>

            <div className="flex px-2 py-1 flex-row items-center bg-primary rounded-3xl">
              <Icon name="star" className="w-4 h-4 !text-white" />
              <AppText className="!text-white text-sm">
                {previewItem.rating.toFixed(1)}
              </AppText>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <AppText className="font-semibold text-xl text-primary">
              {priceSeparator(previewItem.price)}₽
            </AppText>
          </div>
          <AppText className="font-medium">{previewItem.name}</AppText>

          <div className="flex flex-row justify-between items-center">
            <AppText className="text-sm text-light-gray">
              {item.shop.name}
            </AppText>
            <AppText className="text-sm text-light-gray">
              RO-{previewItem.article}
            </AppText>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardItem;
