import { getQueryClient } from "@/src/api/api";
import Cards from "./_components/Cards";
import Shops from "./_components/Shops";
import { fetchPageData } from "./_helpers/fetchPageData";
import Banners from "./_components/Banners";
import Categories from "./_components/Categories";
import { generatePageMetadata } from "./_helpers/generateMetaData";
import { Metadata } from "next";
import Info from "./_components/Info";

export const metadata: Metadata = await generatePageMetadata({
  title: "Товары оптом от производителя по низким ценам",
  description:
    "Лучшие оптовые магазины с товарами в наличии. Прямые поставки, скидки до 60%, выгодные предложения!",
});

const Page = async () => {
  const queryClient = getQueryClient();

  const { categories, banners, shops } = await fetchPageData(queryClient);

  return (
    <div className="mt-2 flex flex-col gap-4">
      <h1 className="sr-only">Товары оптом по выгодным ценам</h1>

      <Banners initialData={banners} />
      <Shops initialData={shops} />
      <Info />
      <Categories initialData={categories} />
      <Cards />
    </div>
  );
};

export default Page;
