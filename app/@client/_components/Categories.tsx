"use client";
import PopularWrapper from "@/src/components/PopularWrapper/PopularWrapper";
import { useCategoriesServiceGetPopularCategoriesSuspense } from "@/src/openapi/queries/suspense";

type Props<T> = {
  initialData: T;
};

const Categories = <T extends any[]>({ initialData }: Props<T>) => {
  const { data } = useCategoriesServiceGetPopularCategoriesSuspense(undefined, {
    initialData,
  });

  return <PopularWrapper label="Популярные категории" href="/" data={data} />;
};

export default Categories;
