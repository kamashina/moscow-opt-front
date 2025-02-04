"use client";
import PopularWrapper from "@/src/components/PopularWrapper/PopularWrapper";
import { useCategoriesServiceGetPopularCategoriesSuspense } from "@/src/openapi/queries/suspense";
import { GetPopularCategoriesResponse } from "@/src/openapi/requests";

type Props = {
  initialData: GetPopularCategoriesResponse;
};

const Categories = ({ initialData }: Props) => {
  const { data } = useCategoriesServiceGetPopularCategoriesSuspense(undefined, {
    initialData,
  });

  return <PopularWrapper label="Популярные категории" href="/" data={data} />;
};

export default Categories;
