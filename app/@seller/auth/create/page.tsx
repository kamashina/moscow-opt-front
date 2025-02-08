"use client";
import { getQueryClient } from "@/src/api/api";
import AppText from "@/src/components/AppText/AppText";
import SelectSearch from "@/src/components/SelectSearch/SelectSearch";
import {
  useCompaniesServiceCreate,
  useDaDataServiceGetParty,
} from "@/src/openapi/queries";
import { CompaniesDto } from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { useLazyQuery } from "@/src/utils/useLazyQuery/useLazyQuery";
import { Button, Icon } from "@mossoft/ui-kit";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const Page = (props: Props) => {
  const { mutateAsync: createCompany, isPending } = useCompaniesServiceCreate();
  const { control, handleSubmit, reset, watch } = useForm<CompaniesDto>();
  const { isPending: isDadataPending, data: companies } =
    useDaDataServiceGetParty({ inn: "" });

  useEffect(() => {}, []);

  console.log(watch("itn"));

  useEffect(() => {
    if (!watch("itn")) return;
    reset({ itn: watch("itn") });
  }, [watch("itn")]);

  const onSearchCompany = async (inn: string) => {
    try {
      const res = await getCompanyByInn({ inn });
      return res;
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const onSubmit = async (requestBody: CompaniesDto) => {
    try {
      const res = await createCompany({ requestBody });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full m-auto max-w-[400px]">
      <div className="relative flex justify-between items-center w-full py-5 px-4 bg-white rounded-[25px]">
        <div
          className="bg-primary-light p-2 rounded-full"
          // onClick={() => setStep(1)}
        >
          <Icon
            name="arrow-left"
            className="w-6 h-6 text-primary cursor-pointer"
          />
        </div>
        <AppText className="font-semibold text-lg absolute left-1/2 transform -translate-x-1/2">
          Создание компании
        </AppText>
      </div>
      <div className="flex flex-col gap-2 p-5 bg-white rounded-[25px]">
        <Controller
          name="itn"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectSearch
              placeholder="Выберите организацию по ИНН"
              options={
                companies?.map((company) => ({
                  label: company.name,
                  value: company.itn,
                })) || []
              }
              // {...field}
              onSearch={onSearchCompany}
              onChange={onChange}
              value={value}
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

export default Page;
<div></div>;
