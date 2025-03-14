"use client";
import AppText from "@/src/components/AppText/AppText";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";

const NAV_OPTIONS: Array<{
  link?: string;
  label: string;
  options?: Array<{ link: string; label: string }>;
}> = [
  {
    label: "Товары",
    options: [
      {
        label: "Все товары",
        link: "/items",
      },
      {
        label: "Добавить товар",
        link: "/items/categories",
      },
      {
        label: "Отзывы",
        link: "/items/reviews",
      },
    ],
  },
  {
    label: "Магазин",
    options: [
      {
        label: "Профиль",
        link: "/shop",
      },
      {
        label: "Редактировать",
        link: "/shop/edit",
      },
      {
        label: "Отзывы",
        link: "/shop/reviews",
      },
      {
        label: "Чат с клиентом",
        link: "/shop/chat",
      },
    ],
  },
  {
    label: "Заказы",
    options: [
      {
        label: "Все заказы",
        link: "/orders",
      },
      {
        label: "Отзывы",
        link: "/orders/reviews",
      },
      {
        label: "Чат с клиентом",
        link: "/orders/chat",
      },
    ],
  },
  {
    label: "Тарифы",
    link: "/tariffs",
  },
  {
    label: "Аналитика",
    link: "/analytics",
  },
  {
    label: "Частые вопросы",
    link: "/faq",
  },
  {
    label: "Инструкция",
    link: "/guide",
  },
];

const TooltipNav = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setActiveTooltip(label);
  };

  const handleMouseLeave = () => {
    tooltipTimeout.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 200);
  };

  return (
    <div className="flex flex-row items-center gap-2 overflow-visible z-20 ">
      {NAV_OPTIONS.map((item) => (
        <div key={item.label} className="relative">
          <Link
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
            href={item.link || ""}
            className="hover:bg-primary-light px-3 py-2 rounded-[15px] p-2"
          >
            <AppText>{item.label}</AppText>
          </Link>
          <AnimatePresence>
            {item.options && activeTooltip === item.label && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute bg-white p-[5px] z-50 rounded-[15px] shadow-lg whitespace-nowrap gap-1 top-12 flex flex-col"
                onMouseEnter={() => {
                  if (tooltipTimeout.current)
                    clearTimeout(tooltipTimeout.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {item.options.map((option) => (
                  <Link
                    key={option.label}
                    href={option.link || ""}
                    className="block hover:bg-primary-light rounded-[10px] p-2"
                  >
                    <AppText>{option.label}</AppText>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
export default TooltipNav;
