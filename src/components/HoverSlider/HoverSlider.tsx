import { useState } from "react";
import Image from "next/image";
import { getServerFile } from "@/src/constants";

type Props = {
  images: string[];
};

const HoverImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const newIndex = Math.floor((x / width) * images.length);
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCurrentIndex(0)}
    >
      <Image
        src={
          getServerFile(images[currentIndex]) || "/images/itemsPlaceholder.png"
        }
        alt={`Preview ${currentIndex}`}
        fill
        sizes="100%"
        className="object-cover bg-white duration-300 rounded-lg"
      />
    </div>
  );
};

export default HoverImageSlider;
