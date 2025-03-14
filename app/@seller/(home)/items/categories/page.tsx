import { Wrapper } from "@mossoft/ui-kit";
import React from "react";
import CategoriesTemplates from "./_components/CategoriesTemplates";
import { prefetchUseCategoriesServiceGetAllCategories } from "@/src/openapi/queries/prefetch";
import { getQueryClient } from "@/src/api/api";
import { ensureUseCategoriesServiceGetAllCategoriesData } from "@/src/openapi/queries/ensureQueryData";

type Props = {};

const Page = async (props: Props) => {
  const queryClient = getQueryClient();
  await prefetchUseCategoriesServiceGetAllCategories(queryClient);
  const categories = await ensureUseCategoriesServiceGetAllCategoriesData(
    queryClient
  );
  return (
    <div>
      <CategoriesTemplates initialData={categories} />
    </div>
  );
};

export default Page;
