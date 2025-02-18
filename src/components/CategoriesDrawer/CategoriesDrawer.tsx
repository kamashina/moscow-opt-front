"use client";
import { Icon } from "@mossoft/ui-kit";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useCategoriesServiceGetAllCategories } from "../../openapi/queries/queries";
import AppText from "../AppText/AppText";

type Props = {};

const CategoriesDrawer: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const prevHeaderOffset = useRef(true);

  const { data: categories } = useCategoriesServiceGetAllCategories();

  useEffect(() => {
    setCategoryId(null);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

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
            className="z-20 border-none w-full h-full max-w-[520px] overflow-hidden"
            overlayClassName={`fixed inset-0 bg-[#0000004D] backdrop-blur-[1px] flex items-start`}
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
              className={`bg-white h-full relative shadow-lg max-w-[520px] flex flex-row`}
            >
              <div
                className={`${modalHeight} flex w-1/2 mt-11 flex-col gap-1 px-2 border-r-[1px] border-r-light-gray border-r-solid overflow-scroll`}
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
                    <AppText className="hover:border-primary font-normal text-base">
                      {category.name}
                    </AppText>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {categoryId && (
                  <motion.div
                    key="subcategory-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className={`${modalHeight} mt-11 flex w-1/2 flex-col gap-1 px-2 border-1 border-light-gray border-solid overflow-scroll`}
                  >
                    {categories
                      ?.find((item) => item.id === categoryId)
                      ?.subCategories?.map((item) => (
                        <Link
                          href={`/categories/sub/${item.id}`}
                          key={item.id}
                          className="flex px-2 items-center py-2 flex-row gap-2 hover:bg-primary-light cursor-pointer rounded-[10px]"
                        >
                          <AppText className="hover:border-primary font-normal text-base">
                            {item.name}
                          </AppText>
                        </Link>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoriesDrawer;
