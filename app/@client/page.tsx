"use client";
import Banners from "@/src/components/Banners/Banners";
import ShopsList from "@/src/components/ShopsList/ShopsList";

const Page = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <Banners />

      <ShopsList />
    </div>
  );
};

export default Page;
