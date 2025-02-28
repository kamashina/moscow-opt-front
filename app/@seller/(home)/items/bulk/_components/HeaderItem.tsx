import AppText from "@/src/components/AppText/AppText";
import { Tooltip } from "react-tooltip";

const INFO_HEADER_TOOLTIP_OPTIONS: Record<string, string> = {
  ["Группа"]: `Группировка по карточкам товара. Товары с одинаковым значением группы будут объединены в одну карточку.`,
  ["Артикул"]: `Должен быть уникальным для каждой карточки товара`,
  ["Дропшиппинг"]: `Для продажи по 1 шт. Формат - шт/1`,
  ["Коробка"]: `Для продажи по несколько шт. Формат - шт/кол-во`,
  ["Кастомный короб"]: `Для продажи по несколько шт с указанием характеристик. Формат: Характеристика товара-Кол-во. Пример 40-1`,
  ["Скидка за шаг, %"]: "Скидка за указанное кол-во товаров",
  ["Максимальная скидка, %"]: "Максимальная скидка для продажи оптом",
  ["Шаг для скидки за шт"]: "Для какого кол-во товаров применять скидку",
};

const HeaderItem = ({ name }: any) => {
  if (INFO_HEADER_TOOLTIP_OPTIONS[name]) {
    return (
      <>
        <a
          id={name.replace(/[^a-zA-Zа-яА-ЯЁё]/g, "")}
          className="flex flex-row items-center justify-start h-full w-full gap-1"
        >
          <AppText>{name}</AppText>
          <AppText className="italic border-[1px] rounded-full p-2  flex items-center justify-center text-sm border-primary w-4 h-4 text-primary">
            i
          </AppText>
        </a>

        <Tooltip
          style={{
            display: "flex",
            whiteSpace: "pre-line",
            maxWidth: "250px",
            lineHeight: "1.2",
          }}
          anchorSelect={`#${name.replace(/[^a-zA-Zа-яА-ЯЁё]/g, "")}`}
          opacity={1}
          place="bottom"
        >
          {INFO_HEADER_TOOLTIP_OPTIONS[name]}
        </Tooltip>
      </>
    );
  }
  return <AppText>{name}</AppText>;
};
export default HeaderItem;
