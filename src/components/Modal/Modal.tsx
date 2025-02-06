"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import Modal from "react-modal";
import AppText from "../AppText/AppText";

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
  const [isClosing, setIsClosing] = useState<boolean>(false);

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
    setIsClosing(true);
    handleClose();
    const body = document.body;
    body.style.overflow = "auto";

    setIsClosing(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className="static border-none w-full max-w-[400px]"
        overlayClassName="fixed z-[1000] top-0 left-0 w-full h-full backdrop-blur-[5px] bg-[#36363652] flex py-5 md:py-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent items-center justify-center px-3 md:p-4"
        onRequestClose={startClose}
        ariaHideApp={false}
      >
        {isOpen && children}
      </Modal>
    </>
  );
};

export default ModalWindow;
