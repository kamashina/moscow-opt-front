import { getQueryClient } from "@/src/api/api";
import SelectSearch from "@/src/components/SelectSearch/SelectSearch";
import Tabs from "@/src/components/Tabs/Tabs";
import {
  COMPANY_TAXATION_TRANSLATIONS,
  COMPANY_TYPES_TRANSLATIONS,
  createOptionsFromTranslations,
  IE_TAXATION_TRANSTLATIONS,
} from "@/src/constants";
import {
  useCompaniesServiceCreate,
  useCompaniesServiceGetMyCompanyKey,
} from "@/src/openapi/queries";
import {
  CompaniesDto,
  DaDataService,
  OrganizationResponse,
} from "@/src/openapi/requests";
import { Exception } from "@/src/types";
import { Button, Input } from "@mossoft/ui-kit";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

const CreateCompanyForm = () => {
  const queryClient = getQueryClient();

  const { mutateAsync: createCompany, isPending } = useCompaniesServiceCreate({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [useCompaniesServiceGetMyCompanyKey],
      });
    },
  });
  const { control, handleSubmit, reset, watch } = useForm<CompaniesDto>();

  const {
    mutate: getCompanyByInn,
    data: companies,
    isPending: isCompaniesLoading,
  } = useMutation({
    mutationFn: DaDataService.getParty,
  });

  const onSearchCompany = (inn: string) => {
    if (!inn) return;
    try {
      getCompanyByInn({ inn });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  const onSelectCompany = (data: OrganizationResponse) => {
    const { itn, kpp, ...company } = data;
    reset({
      ...company,
      itn: itn,
      kpp: kpp || undefined,
    });
  };

  const onSubmit = async (requestBody: CompaniesDto) => {
    try {
      const res = await createCompany({ requestBody });
    } catch (e) {
      enqueueSnackbar((e as Exception).message, { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-3 py-4 lg:px-5 max-h-[740px] overflow-y-auto bg-white rounded-[25px]">
      <Controller
        name="itn"
        rules={{ required: "Заполните поле" }}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectSearch
            disabled={!!watch("itn")}
            label="ИНН"
            error={error}
            onSelectOption={onSelectCompany}
            placeholder="Выберите организацию по ИНН"
            isLoading={isCompaniesLoading}
            options={
              companies?.map((company) => ({
                ...company,
                label: company.name,
                value: company.itn,
              })) || []
            }
            onSearch={onSearchCompany}
            onChange={onChange}
            value={value?.toString()}
          />
        )}
      />

      {watch("itn") && (
        <>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Tabs
                disabled
                options={createOptionsFromTranslations(
                  COMPANY_TYPES_TRANSLATIONS
                )}
                label="Тип организации"
                {...inputField}
              />
            )}
          />
          <Controller
            control={control}
            name="taxation"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Tabs
                options={createOptionsFromTranslations(
                  watch("type") === "LEGAL"
                    ? COMPANY_TAXATION_TRANSLATIONS
                    : IE_TAXATION_TRANSTLATIONS
                )}
                label="Форма организации"
                {...inputField}
              />
            )}
          />
          {watch("type") === "LEGAL" && (
            <Controller
              control={control}
              name="kpp"
              rules={{ required: "Заполните поле" }}
              render={(inputField) => (
                <Input
                  type="text"
                  placeholder="Введите КПП"
                  label="КПП"
                  {...inputField}
                />
              )}
            />
          )}
          <Controller
            control={control}
            name="psrnsp"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Input
                type="text"
                placeholder="Введите ОГРН"
                label="ОГРН"
                {...inputField}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Input
                type="text"
                label="Краткое наименование продавца"
                placeholder="Введите Краткое наименование продавца"
                {...inputField}
              />
            )}
          />
          <Controller
            control={control}
            name="full_with_opf"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Input
                type="text"
                placeholder="Введите  полное наименование"
                label="Полное наименование продавца"
                {...inputField}
              />
            )}
          />
          <Controller
            control={control}
            name="management_name"
            rules={{ required: "Заполните поле" }}
            render={(inputField) => (
              <Input
                type="text"
                placeholder="Введите ФИО"
                label="ФИО руководителя"
                {...inputField}
              />
            )}
          />
        </>
      )}

      <Button
        variant="link"
        disabled={isPending}
        onClick={handleSubmit(onSubmit)}
        className="bg-primary h-10 mt-3 !w-full text-white rounded-[20px] text-base !py-3"
      >
        Подтвердить
      </Button>
    </div>
  );
};

export default CreateCompanyForm;
