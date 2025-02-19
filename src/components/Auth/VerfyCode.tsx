import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import OtpInput from "@/src/components/OtpInput/OtpInput";
import {
  useAuthServiceVerifyCode,
  useCardsServiceGetAllCardsKey,
  useUsersServiceGetMeKey,
} from "@/src/openapi/queries";
import { VerifyCodeDto } from "@/src/openapi/requests";
import { useAuthStore } from "@/src/store/auth";
import { Exception } from "@/src/types";
import { setToken } from "@/src/utils/setToken";
import { Button } from "@mossoft/ui-kit";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";

type Props<> = {
  step: number;
  setStep: (step: number) => void;
  refetchSms: () => void;
  phone: string;
  timer: number;
  type: "seller" | "client";
};

const VerifyCode = ({ refetchSms, phone, type = "client", timer }: Props) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const { setUserCredentials } = useAuthStore();
  const [modal, setModal] = useQueryState("modal");
  const { mutateAsync: verifyCode, isPending } = useAuthServiceVerifyCode();
  const { handleSubmit, control, setError } = useForm<VerifyCodeDto>();

  const onSubmit = async (data: { code: string }) => {
    try {
      const user = await verifyCode({ requestBody: { ...data, phone } });

      setToken(user.access_token);
      queryClient.invalidateQueries();
      setUserCredentials({
        access_token: user.access_token,
        isAuthenticated: true,
      });

      if (type === "seller") {
        await queryClient.resetQueries();
        user?.company?.status === "approved"
          ? router.push("/")
          : router.push("/company/create");
        return;
      }

      setModal(null, { scroll: false });
    } catch (e) {
      setError("code", { message: (e as Exception).message });
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
        disabled={isPending}
        variant="link"
        className="bg-primary h-10 !w-full text-white rounded-[20px] !py-3"
      >
        Подтвердить
      </Button>
    </div>
  );
};
export default VerifyCode;
