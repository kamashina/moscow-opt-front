"use client";
import { Icon } from "@mossoft/ui-kit";
import Image from "next/image";
import { FC, PropsWithChildren, useEffect } from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

Modal.setAppElement("body");

const ModalWindow: FC<PropsWithChildren<Props>> = ({
  isOpen,
  handleClose,
  children,
}) => {
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
      return;
    }
    body.style.overflow = "auto";
    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpen]);

  const startClose = () => {
    handleClose();
    const body = document.body;
    body.style.overflow = "auto";
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className="static border-none w-full lg:max-w-[400px]"
        overlayClassName="fixed z-[1000] top-0 bg-[#DDD] left-0 w-full h-full lg:backdrop-blur-[5px] lg:bg-[#36363652] flex lg:py-5 md:py-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent lg:items-center lg:justify-center lg:px-3 md:p-4"
        onRequestClose={startClose}
        ariaHideApp={false}
      >
        {isOpen && children}
      </Modal>
    </>
  );
};

export default ModalWindow;
