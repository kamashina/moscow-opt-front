"use client";
import AuthTabs from "@/src/components/Auth/AuthTabs";
import Login from "@/src/components/Auth/Login";
import Register from "@/src/components/Auth/Register";
import {
  AuthTabsTypes,
  TAB_VARIANT_LOGIN,
  TAB_VARIANT_REGISTRATION,
} from "@/src/constants";
import { SendSmsDto } from "@/src/openapi/requests";
import { RegisterForm } from "@/src/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [tab, setTab] = useState<AuthTabsTypes>("login");
  const [step, setStep] = useState(1);
  const registerForm = useForm<RegisterForm>();
  const loginForm = useForm<SendSmsDto>();

  return (
    <div className="flex flex-col gap-2 w-full lg:my-auto mx-auto max-w-[400px]">
      <AuthTabs setStep={setStep} step={step} setTab={setTab} tab={tab} />

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
            <Login
              type="seller"
              setStep={setStep}
              step={step}
              form={loginForm}
            />
          )}

          {tab === "register" && (
            <Register
              type="seller"
              setStep={setStep}
              step={step}
              form={registerForm}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
