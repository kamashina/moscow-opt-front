import Image from "next/image";
import Link from "next/link";

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
  return (
    <div>
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
