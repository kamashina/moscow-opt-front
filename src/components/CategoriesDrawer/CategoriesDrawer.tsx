"use client";
import { Icon } from "@mossoft/ui-kit";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import { useCategoriesServiceGetAllCategories } from "../../openapi/queries/queries";
import AppText from "../AppText/AppText";
import React from "react";

type Props = {};

const CategoriesDrawer: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const prevHeaderOffset = useRef(true);

  const { data: categories } = useCategoriesServiceGetAllCategories();

  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.cssText = `overflow: hidden; padding-right: ${scrollbarWidth}px`;

    return () => {
      document.body.style.cssText = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const newOffset = window.scrollY < 10;
      if (prevHeaderOffset.current !== newOffset) {
        prevHeaderOffset.current = newOffset;
      }
    };
    window.addEventListener("scroll", handleScroll);
    setCategoryId(null);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const subCategories = useMemo(
    () => categories?.find((item) => item.id === categoryId)?.subCategories,
    [categories, categoryId]
  );

  const modalHeight = `h-[calc(100vh-${prevHeaderOffset.current ? 40 : 0}px)]`;

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="group cursor-pointer flex flex-row gap-2 bg-primary-light p-1 pr-4 rounded-[25px] items-center hover:bg-primary active:opacity-70"
      >
        <motion.div
          className="rounded-full bg-white p-3 group-hover:bg-white"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            name={isOpen ? "close" : "catalog"}
            className="w-5 h-5 !text-primary"
          />
        </motion.div>
        <AppText className="text-primary group-hover:text-white">
          Каталог
        </AppText>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            className="relative border-none w-fit h-full max-w-[520px] overflow-hidden"
            overlayClassName="fixed z-50 inset-0 bg-[#0000004D] backdrop-blur-[1px] flex items-start"
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            shouldCloseOnEsc
            style={{ overlay: { top: prevHeaderOffset.current ? 90 : 50 } }}
            onRequestClose={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`bg-white ${
                categoryId && subCategories?.length ? "min-w-fit" : "w-fit"
              } h-full shadow-lg  flex flex-row`}
            >
              <div
                className={`${modalHeight} flex mt-11 w-[280px] px-2 flex-col gap-1 border-r-[1px] border-r-light-gray border-r-solid overflow-y-scroll`}
              >
                {categories?.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseOver={() => setCategoryId(category.id)}
                    onClick={() => setCategoryId(category.id)}
                    className={`${
                      categoryId === category.id ? "bg-primary-light" : ""
                    } flex px-2 items-center py-2 flex-row gap-2 hover:bg-primary-light cursor-pointer rounded-[10px]`}
                  >
                    <Icon name="category" className="w-6 h-6 !text-primary" />
                    <AppText className="hover:border-primary font-normal">
                      {category.name}
                    </AppText>
                  </motion.div>
                ))}
              </div>

              {categoryId && subCategories?.length ? (
                <AnimatePresence>
                  <motion.div
                    key="subcategory-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={`${modalHeight} mt-11 flex w-[240px] flex-col gap-1 px-2 border-1 border-light-gray border-solid overflow-y-scroll`}
                  >
                    <AppText className="font-semibold text-lg items-center flex px-2 py-2">
                      {categories?.find(({ id }) => id === categoryId)?.name}
                    </AppText>
                    {subCategories.map((item) => (
                      <Link
                        href={`/categories/sub/${item.id}`}
                        key={item.id}
                        className="px-2 items-center py-2 hover:bg-primary-light cursor-pointer rounded-[10px]"
                      >
                        <AppText className="hover:border-primary font-normal">
                          {item.name}
                        </AppText>
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <></>
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(CategoriesDrawer);
