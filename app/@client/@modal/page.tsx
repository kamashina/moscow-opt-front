"use client";
import AppText from "@/src/components/AppText/AppText";
import Modal from "@/src/components/Modal/Modal";
import { AuthTabsTypes } from "@/src/constants";
import { RegisterUserDto, SendSmsDto } from "@/src/openapi/requests";
import { Icon } from "@mossoft/ui-kit";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AUTH_TABS_TRANSLATIONS } from "../../../src/constants";
import AuthTabs from "./_components/AuthTabs";
import Login from "./_components/Login";
import Register from "./_components/Register";

const tabVariantRegistration = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const tabVariantLogin = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2, ease: "easeIn" } },
};

const Page = () => {
  const form = useForm<
    (RegisterUserDto & { password_confirmation: string }) | SendSmsDto
  >();
  const [tab, setTab] = useState<AuthTabsTypes>("login");
  const [step, setStep] = useState(1);
  const [modal, setModal] = useQueryState("modal");

  useEffect(() => {
    setStep(1);
    setTab("login");
  }, [modal]);

  return (
    <Modal isOpen={modal === "auth"} handleClose={() => setModal(null)}>
      <div className="flex flex-col gap-2">
        {step === 1 ? (
          <div className="flex flex-col gap-2 p-1 bg-white rounded-[25px]">
            <AuthTabs tab={tab} setTab={setTab} />
          </div>
        ) : (
          <div className="flex justify-between items-center w-full py-5 px-4 bg-white rounded-[25px]">
            <div onClick={() => setStep(1)}>
              <Icon
                name="arrow-left"
                className="w-6 h-6 text-primary cursor-pointer"
              />
            </div>
            <AppText className="font-semibold text-lg">
              {AUTH_TABS_TRANSLATIONS[tab]}
            </AppText>
            <div onClick={() => setModal(null)}>
              <Icon
                name="close"
                className="w-6 h-6 text-primary cursor-pointer"
              />
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            className="flex flex-col gap-2 p-5 bg-white rounded-[25px]"
            key={`${step}-${tab}`}
            variants={
              tab === "register" ? tabVariantLogin : tabVariantRegistration
            }
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {tab === "login" ? (
              <Login setStep={setStep} step={step} form={form} />
            ) : (
              <Register setStep={setStep} step={step} form={form} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default Page;
