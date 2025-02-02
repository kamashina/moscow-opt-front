"use client";

import {
  useCategoriesServiceGetAllCategories,
  useItemServiceGetAllItems,
} from "@/src/openapi/queries";
import Image from "next/image";

export default function Home() {
  const { data } = useItemServiceGetAllItems();

  const { data: categories } = useCategoriesServiceGetAllCategories();

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id} className="whitespace-nowrap">
          {item.name}

          {item.images.map((image) => (
            <div key={image} className="relative w-[140px] h-[140px] ">
              <Image
                fill
                priority
                src={process.env.NEXT_PUBLIC_SERVER_URL + image}
                alt={image}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
