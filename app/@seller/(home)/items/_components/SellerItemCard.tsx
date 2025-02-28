import AppText from "@/src/components/AppText/AppText";
import { getServerFile, ITEM_STATUSES_TRANSLATIONS } from "@/src/constants";
import { ItemsEntityMinInfoByShop } from "@/src/openapi/requests";
import Image from "next/image";
import React, { Dispatch, FC } from "react";

type Props = {
  item: ItemsEntityMinInfoByShop;
  isChecked: boolean;
  setCheckedItems: Dispatch<React.SetStateAction<number[]>>;
};

const SellerItemCard: FC<Props> = ({ item, isChecked, setCheckedItems }) => {
  const handleCkeckItem = () => {
    if (isChecked) {
      setCheckedItems((prev: number[]) => [
        ...prev.filter((id) => id !== item.id),
      ]);
      return;
    }
    setCheckedItems((prev) => [...prev, item.id]);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={handleCkeckItem} checked={isChecked} />
      </td>

      <td className="flex flex-row text-start justify-start gap-2">
        <Image
          src={
            item.images[0]
              ? getServerFile(item.images[0])
              : "/images/itemsPlaceholder.png"
          }
          width={100}
          height={150}
          priority
          className="w-[100px] h-[150px] object-cover block rounded-lg"
          alt={item.id.toString()}
        />

        <div className="flex flex-col">
          <AppText className="font-semibold">{item.name}</AppText>

          <AppText className="text-sm text-dark-gray">
            Артикул: {item.sellerArticle}
          </AppText>
          <AppText className="text-sm text-dark-gray">{item.brand}</AppText>
          <AppText className="text-sm text-dark-gray">
            {ITEM_STATUSES_TRANSLATIONS[item.status]}
          </AppText>
        </div>
      </td>
      <td>
        <AppText className="font-semibold">{item.article}</AppText>
      </td>
      <td>
        <AppText className="text-sm text-dark-gray">{item.rating}/5</AppText>
      </td>
    </tr>
  );
};

export default React.memo(SellerItemCard);
