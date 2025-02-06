import AppText from "@/src/components/AppText/AppText";
import OtpInput from "@/src/components/OtpInput/OtpInput";
import { useAuthServiceVerifyCode } from "@/src/openapi/queries";
import { AuthService, VerifyCodeDto } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { setToken } from "@/src/utils/setToken";
import { Button } from "@mossoft/ui-kit";
import { enqueueSnackbar } from "notistack";
import { useQueryState } from "nuqs";
import { Controller, FieldValues, useForm } from "react-hook-form";

type Props<T extends FieldValues> = {
  step: number;
  setStep: (step: number) => void;
  refetchSms: () => void;
  phone: string;
  timer: number;
};

const VerifyCode = <T extends FieldValues>({
  refetchSms,
  phone,
  timer,
}: Props<T>) => {
  const [modal, setModal] = useQueryState("modal");
  const { mutateAsync: verifyCode } = useAuthServiceVerifyCode();
  const { handleSubmit, control } = useForm<VerifyCodeDto>();

  const onSubmit = async (data: { code: string }) => {
    try {
      const res = await verifyCode({ requestBody: { ...data, phone } });
      res.access_token && setToken(res.access_token);
      setModal(null);
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  return (
    <div className="items-center flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <AppText>Введите код из СМС</AppText>
        <AppText className="text-light-gray text-sm font-normal">
          Код был отправлен на номер {`+7 *** *** ** ${phone.slice(-2)}`}
        </AppText>
      </div>
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <OtpInput
            onChange={onChange}
            renderInput={(props) => <input {...props} />}
            value={value}
            error={error?.message}
          />
        )}
      />

      <Button
        variant="link"
        onClick={refetchSms}
        className={`${timer ? "underline" : ""} text-sm text-primary`}
        disabled={!!timer}
      >
        {timer
          ? `Повторная отправка через ${timer} сек`
          : "Отправить код еще раз"}
      </Button>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="link"
        className="bg-primary h-10 !w-full text-white rounded-[20px] !py-3"
      >
        Подтвердить
      </Button>
    </div>
  );
};
export default VerifyCode;
