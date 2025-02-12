import { COMPANY_TYPES_TRANSLATIONS } from "@/src/constants";
import { CompaniesResponse } from "@/src/openapi/requests";
import React from "react";

type Props = {
  company: CompaniesResponse;
};

const CompanyInfo = ({ company }: Props) => {
  return (
    <div className="max-w-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Ваш личный кабинет успешно создан!
      </h2>

      <p className="mb-3">
        <strong>{company.name}</strong> находится на стадии проверки.
      </p>

      <p>Активация учетной записи для </p>
      <p>
        ИНН: <strong>{company.itn}</strong>
      </p>
      <p className="mb-3">
        может занять до <span className="font-bold">трёх рабочих дней</span>.
      </p>

      <h3 className="font-medium mb-2">
        <strong>Что дальше?</strong>
      </h3>

      <p className="mb-3">
        После успешной активации вы автоматически попадёте в личный кабинет.
      </p>

      <p>
        Если по истечении трёх дней активация не произошла, попробуйте
        зарегистрироваться заново.
      </p>
    </div>
  );
};

export default CompanyInfo;
