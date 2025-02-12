import {
  useAuthServiceGetSmsTimer,
  useAuthServiceLoginSms,
} from "@/src/openapi/queries";
import { SendSmsDto } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { Button, Input } from "@mossoft/ui-kit";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import VerifyCode from "./VerfyCode";

type Props = {
  step: number;
  setStep: (step: number) => void;
  form: UseFormReturn<SendSmsDto>;
  type?: "seller" | "client";
};

const Login = ({ setStep, step, form, type = "client" }: Props) => {
  const router = useRouter();
  const { mutateAsync: sendSms, isPending } = useAuthServiceLoginSms();
  const { handleSubmit, control, watch } = form;
  const [timer, setTimer] = useState(0);
  const { data: smsTimer, refetch } = useAuthServiceGetSmsTimer(
    {
      phone: watch("phone"),
    },
    undefined,
    { enabled: false }
  );

  useEffect(() => {
    if (!watch("phone")) return;
    refetch();
  }, [step, isPending]);

  useEffect(() => {
    if (!smsTimer?.expiresIn) return;
    setTimer(smsTimer.expiresIn);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [smsTimer?.expiresIn]);

  const onSubmit = async (data: SendSmsDto) => {
    try {
      const { data: newSmsTimer } = await refetch();
      if (newSmsTimer?.expiresIn) {
        setTimer(newSmsTimer.expiresIn);
        setStep(2);
        return;
      }

      const res = await sendSms({ requestBody: data });
      res?.expiresIn && setTimer(+res.expiresIn);
      router.push("");
      setStep(2);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  if (step === 2) {
    return (
      <VerifyCode
        timer={timer}
        type={type}
        phone={watch("phone")}
        setStep={setStep}
        step={step}
        refetchSms={handleSubmit(onSubmit)}
      />
    );
  }

  return (
    <div className="w-full">
      <Controller
        name="phone"
        rules={{
          required: "Заполните поле",
          pattern: {
            value: /^\d{10}$/,
            message: "Введите корректный номер в формате +7XXXXXXXXXX",
          },
        }}
        control={control}
        render={(inputFields) => (
          <Input
            type="text"
            format="+7 (###) ### ## ##"
            label="Номер телефона"
            placeholder="Введите номер"
            {...inputFields}
          />
        )}
      />
      <Button
        variant="link"
        disabled={isPending}
        onClick={handleSubmit(onSubmit)}
        className="bg-primary h-10 !w-full text-white mt-5 rounded-[20px] text-base !py-3"
      >
        Отправить смс-код
      </Button>
    </div>
  );
};

export default Login;
