import {
  useAuthServiceGetSmsTimer,
  useAuthServiceRegisterSms,
} from "@/src/openapi/queries";
import { RegisterUserDto } from "@/src/openapi/requests";
import { Exception, RegisterForm } from "@/src/types";
import { Button, Input } from "@mossoft/ui-kit";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import VerifyCode from "./VerfyCode";

type Props = {
  step: number;
  setStep: (step: number) => void;
  form: UseFormReturn<RegisterForm>;
};

const Register = ({ setStep, step, form }: Props) => {
  const { mutateAsync: sendSms, isPending } = useAuthServiceRegisterSms();
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

  const onSubmit = async (
    data: RegisterUserDto & { password_confirmation: string }
  ) => {
    const { password_confirmation, ...requestBody } = data;
    const { data: newSmsTimer } = await refetch();
    if (newSmsTimer?.expiresIn) {
      setTimer(newSmsTimer.expiresIn);
      setStep(2);
      return;
    }

    try {
      const res = await sendSms({ requestBody });
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
    <div>
      <div className="flex flex-col gap-2 w-full">
        <Controller
          control={control}
          name="full_name"
          rules={{
            required: "Заполните поле",
            minLength: {
              value: 3,
              message: "Минимальная длина 3 символа",
            },
            pattern: {
              value:
                /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)?$/,
              message: "Введите корректное ФИО",
            },
          }}
          render={(inputFields) => (
            <Input
              {...inputFields}
              type="text"
              label="ФИО"
              placeholder="Введите ФИО"
            />
          )}
        />
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
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Заполните поле",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Введите корректный email",
            },
          }}
          render={(inputFields) => (
            <Input
              {...inputFields}
              type="email"
              label="Почта"
              placeholder="Введите почту"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Заполните поле",
            minLength: {
              value: 8,
              message: "Пароль должен содержать минимум 8 символов",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Пароль должен содержать хотя бы одну заглавную букву и цифру",
            },
          }}
          render={(inputField) => (
            <Input
              type="password"
              placeholder="Пароль"
              label="Пароль"
              {...inputField}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirmation"
          rules={{
            required: "Заполните поле",
            validate: (value) =>
              value && value === watch("password")
                ? true
                : "Пароли не совпадают",
          }}
          render={(inputField) => (
            <Input
              autoComplete="new-password"
              type="password"
              placeholder="Подтвердите пароль"
              label="Подтвердите пароль"
              {...inputField}
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
    </div>
  );
};

export default Register;
