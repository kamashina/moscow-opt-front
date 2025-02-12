"use client";
import { useCompaniesServiceGetMyCompany } from "@/src/openapi/queries";
import { Loader } from "@mossoft/ui-kit";
import CompanyInfo from "./_components/CompanyInfo";
import CreateCompanyForm from "./_components/CreateCompanyForm";
import CompanyWrapper from "./_components/CompanyWrapper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: company, isPending } = useCompaniesServiceGetMyCompany();

  useEffect(() => {
    company?.status === "approved" && router.push("/");
  }, [company]);

  return (
    <CompanyWrapper label="Создание компании">
      {isPending && <Loader style={{ width: "40px", height: "40px" }} />}
      {!company && !isPending && <CreateCompanyForm />}
      {company?.status === "pending" && <CompanyInfo company={company} />}
    </CompanyWrapper>
  );
};

export default Page;
