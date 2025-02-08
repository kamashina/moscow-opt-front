"use client";
import AppText from "@/src/components/AppText/AppText";
import Modal from "@/src/components/Modal/Modal";
import {
  AuthTabsTypes,
  TAB_VARIANT_LOGIN,
  TAB_VARIANT_REGISTRATION,
} from "@/src/constants";
import { RegisterUserDto, SendSmsDto } from "@/src/openapi/requests";
import { Icon } from "@mossoft/ui-kit";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { AUTH_TABS_TRANSLATIONS } from "../../../src/constants";

import Image from "next/image";
import AuthTabs from "@/src/components/Auth/AuthTabs";
import Login from "@/src/components/Auth/Login";
import Register from "@/src/components/Auth/Register";
import { RegisterForm } from "@/src/types";

const Page = () => {
  const registerForm = useForm<RegisterForm>();
  const loginForm = useForm<SendSmsDto>();

  const [tab, setTab] = useState<AuthTabsTypes>("login");
  const [step, setStep] = useState(1);
  const [modal, setModal] = useQueryState("modal");

  useEffect(() => {
    setStep(1);
    setTab("login");
  }, [modal]);

  return (
    <div className="flex flex-col gap-2 w-full m-auto max-w-[400px]">
      {step === 1 ? (
        <div className="flex flex-col gap-2 p-1 bg-white rounded-[25px]">
          <AuthTabs tab={tab} setTab={setTab} />
        </div>
      ) : (
        <div className="relative flex justify-between items-center w-full py-5 px-4 bg-white rounded-[25px]">
          <div
            className="bg-primary-light p-2 rounded-full"
            onClick={() => setStep(1)}
          >
            <Icon
              name="arrow-left"
              className="w-6 h-6 text-primary cursor-pointer"
            />
          </div>
          <AppText className="font-semibold text-lg absolute left-1/2 transform -translate-x-1/2">
            {AUTH_TABS_TRANSLATIONS[tab]}
          </AppText>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          className="flex flex-col gap-2 p-5 bg-white rounded-[25px]"
          key={`${step}-${tab}`}
          variants={
            tab === "register" ? TAB_VARIANT_LOGIN : TAB_VARIANT_REGISTRATION
          }
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {tab === "login" && (
            <Login setStep={setStep} step={step} form={loginForm} />
          )}

          {tab === "register" && (
            <Register setStep={setStep} step={step} form={registerForm} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
