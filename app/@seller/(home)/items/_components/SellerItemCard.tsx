import AppText from "@/src/components/AppText/AppText";
import { getServerFile, ITEM_STATUSES_TRANSLATIONS } from "@/src/constants";
import { ItemsEntityMinInfoByShop } from "@/src/openapi/requests";
import { Icon } from "@mossoft/ui-kit";
import Image from "next/image";
import React, { Dispatch, FC } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

type ItemCard = { id: number; subCategoryId: number };

type Props = {
  item: ItemsEntityMinInfoByShop;
  isChecked: boolean;
  setCheckedItems: Dispatch<React.SetStateAction<ItemCard[]>>;
};

const SellerItemCard: FC<Props> = ({ item, isChecked, setCheckedItems }) => {
  const handleCkeckItem = () => {
    if (isChecked) {
      setCheckedItems((prev: ItemCard[]) => [
        ...prev.filter((card) => card.id !== item.id),
      ]);
      return;
    }
    setCheckedItems((prev) =>
      prev.length >= 100
        ? prev
        : [...prev, { id: item.id, subCategoryId: item.subCategory.id }]
    );
  };

  const tdStyle = "px-2 py-2 min-w-full text-center align-middle";
  const textStyle = "text-dark-gray w-fit whitespace-nowrap";

  return (
    <tr className="hover:bg-[#F0F0F3] cursor-pointer space-y-2">
      <td className={tdStyle}>
        <div className="px-2 min-w-max">
          <input
            type="checkbox"
            onChange={handleCkeckItem}
            checked={isChecked}
            className="w-5 h-5 border border-gray-400 rounded-md transition-all duration-300 bg-primary checked:bg-primary checked:ring-primary focus:outline-none"
          />
        </div>
      </td>

      <td className={tdStyle}>
        <div className="flex flex-row text-start justify-start gap-2 w-[300px]">
          <Image
            src={
              item.images[0]
                ? getServerFile(item.images[0])
                : "/images/itemsPlaceholder.png"
            }
            width={80}
            height={120}
            priority
            className="w-[80px] h-[120px] object-cover block rounded-lg"
            alt={item.id.toString()}
          />

          <div className="flex flex-col">
            <AppText className="font-semibold text-sm">{item.name}</AppText>
            <AppText className="text-xs text-dark-gray whitespace-nowrap">
              Артикул поставщика: {item.sellerArticle}
            </AppText>
            <AppText className="text-xs text-dark-gray">
              Бренд: {item.brand}
            </AppText>
            <AppText className="text-xs text-dark-gray">
              Категория: {item.subCategory.name}
            </AppText>
            <div className="w-fit items-center mt-auto">
              <AppText
                className={`text-xs px-2 py-1 rounded-lg text-white ${
                  (item.status === "active" && "bg-success") ||
                  (item.status === "reject" && "bg-danger") ||
                  (item.status === "draft" && "bg-[#ADD8E6]")
                }`}
              >
                {ITEM_STATUSES_TRANSLATIONS[item.status]}
              </AppText>
            </div>
          </div>
        </div>
      </td>

      <td className={tdStyle}>
        <div className="w-[200px]">
          <AppText className={textStyle}>{item.article}</AppText>
        </div>
      </td>

      <td className={tdStyle}>
        <div className="w-fit flex justify-center">
          <div className="flex px-2 py-1 flex-row items-center w-fit gap-1 bg-primary rounded-3xl ">
            <Icon name="star" className="w-4 h-4 !text-white" />
            <AppText className="!text-white text-sm">
              {item.rating.toFixed(1)}
            </AppText>
          </div>
        </div>
      </td>

      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>{item.quantity}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>
            {item?.dropshipping ? "Да" : "Нет"}
          </AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>
            {item?.box?.options.name}/{item?.box?.options?.quantity}
          </AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>
            {item?.customBox?.fields?.length
              ? item.customBox?.fields
                  .map((item) => [item.name, item.quantity].join("-"))
                  .join(", ")
              : ""}
          </AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>{item.price}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-10 flex justify-center">
          <AppText className={textStyle}>{item.discountStepQuantity}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-[200px] flex justify-center">
          <AppText className={textStyle}>{item.discountPerStep}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-[200px] flex justify-center">
          <AppText className={textStyle}>{item.maxDiscount}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-[200px] flex justify-center">
          <AppText className={textStyle}>{item.countryOfOrigin}</AppText>
        </div>
      </td>
      <td className={tdStyle}>
        <div className="w-fit px-[30px] flex justify-center">
          <AppText className={textStyle}>
            {format(parseISO(item.createdAt), "d MMMM yyyy", {
              locale: ru,
            })}
          </AppText>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(SellerItemCard);
