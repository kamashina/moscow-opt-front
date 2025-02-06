import {
  useAuthServiceGetSmsTimer,
  useAuthServiceLoginSms,
} from "@/src/openapi/queries";
import { SendSmsDto } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { Input, Button } from "@mossoft/ui-kit";
import { enqueueSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import VerifyCode from "./VerfyCode";
import { useEffect, useState } from "react";

type Props = {
  step: number;
  setStep: (step: number) => void;
  form: ReturnType<typeof useForm<SendSmsDto>>;
};

const Login = ({ setStep, step, form }: Props) => {
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
  }, [step]);

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
      setStep(2);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  if (step === 2) {
    return (
      <VerifyCode
        timer={timer}
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
        className="bg-primary h-10 !w-full text-white rounded-[20px] text-base !py-3"
      >
        Отправить смс-код
      </Button>
    </div>
  );
};

export default Login;
