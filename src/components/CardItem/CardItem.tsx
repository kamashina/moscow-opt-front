import {
  useCardsServiceGetAllCardsKey,
  useFavoritesServiceChangeFavorite,
} from "@/src/openapi/queries";
import { CardResponse } from "@/src/openapi/requests";
import { Icon } from "@mossoft/ui-kit";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import AppText from "../AppText/AppText";
import ProductSchema from "../SEO/ProductSchema";
import { getQueryClient } from "@/src/api/api";
import { BOX_TYPES_TRANlSATIONS, getServerFile } from "@/src/constants";

type Props = {
  item: CardResponse;
};

const CardItem = ({ item }: Props) => {
  const queryClient = getQueryClient();
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
      enqueueSnackbar("Произошла ошибка", { variant: "error" });
      console.log(e);
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

      <Link className="flex flex-col gap-1" href={`/items/${item.id}`}>
        <div className="relative h-[300px] w-full">
          <div onClick={handleChangeFavorite} className="cursor-pointer">
            <Icon
              name="like"
              className={`w-8 h-8  ${
                item.isFavorite ? "!text-danger" : "!text-white"
              } absolute top-3 right-4 z-10`}
            />
          </div>
          <Image
            src={
              previewItem.images[0]
                ? getServerFile(previewItem.images[0])
                : "/images/itemsPlaceholder.png"
            }
            alt={previewItem.name}
            fill
            sizes="100%"
            className="rounded-[30px]"
          />
        </div>
        <AppText className="font-medium">{previewItem.name}</AppText>
        <AppText className="font-light text-[#808080] text-xs">
          RO-{previewItem.article}
        </AppText>
        <div className="flex flex-row justify-between items-center">
          <AppText className="font-medium text-xl text-primary-dark-light">
            {previewItem.price}₽
          </AppText>

          <div className="flex flex-row items-center gap-1">
            <Icon name="star" className="w-4 h-4 !text-[#F6B51E]" />
            <AppText className="!text-[#F6B51E]">
              {previewItem.rating.toFixed(1)}
            </AppText>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <AppText className="text-primary">
            {previewItem.box?.type &&
              BOX_TYPES_TRANlSATIONS[previewItem.box?.type]}
          </AppText>
          <AppText>{item.shop.name}</AppText>
        </div>
      </Link>
    </>
  );
};

export default CardItem;
