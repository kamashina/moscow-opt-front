"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  className?: string;
};

Modal.setAppElement("body");

const ModalWindow: FC<PropsWithChildren<Props>> = ({
  isOpen,
  className,
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
        preventScroll
        shouldFocusAfterRender={false}
        className={`static border-none w-full lg:max-w-[400px] ${className}`}
        overlayClassName="fixed z-[1000] top-0 bg-[#DDD] left-0 w-full h-full lg:bg-[#0a0a0a52] flex lg:py-5 md:py-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent lg:items-center lg:justify-center lg:px-3 md:p-4"
        onRequestClose={startClose}
        ariaHideApp={false}
      >
        {isOpen && children}
      </Modal>
    </>
  );
};

export default ModalWindow;
