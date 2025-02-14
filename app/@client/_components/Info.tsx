"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const BANNER_OPTIONS = [
  {
    src: "images/seller_info_banner.svg",
    link: "/",
    alt: "seller_info",
    title: "",
  },
  {
    src: "images/support_banner.svg",
    link: "/",
    alt: "support",
    title: "",
  },
];

const Info = () => {
  const [bannerId, setBannerId] = useState(1);

  //   const currentIndex = data?.findIndex((item) => item.id === bannerId);

  //   const handleScroll = (position: "left" | "right") => {
  //     if (!data?.length) return;

  //     if (position === "left") {
  //       setBannerId(data[currentIndex - 1].id);
  //       return;
  //     }
  //     if (position === "right") {
  //       setBannerId(data[currentIndex + 1].id);
  //       return;
  //     }
  //   };

  return (
    <div>
      {/* import sellerBanner from "././../../public/images/seller_info_banner.svg"; */}
      <div className="flex flex-row gap-2">
        {BANNER_OPTIONS.map((item) => (
          <Link
            key={item.src}
            href={item.link}
            className="relative w-full h-[300px]"
          >
            <Image fill src={item.src} alt={item.alt} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Info;
