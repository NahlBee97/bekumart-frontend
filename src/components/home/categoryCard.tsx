"use client"

import { ICategory } from "@/interfaces/dataInterfaces";
import { useRouter } from "next/navigation";

export const CategoryCard = ({ category }: { category: ICategory }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-start p-3 md:p-2 gap-2 text-center group w-24 md:w-24 cursor-pointer shrink-0"
      onClick={() =>
        router.push(`/shop?search=${encodeURIComponent(category.name.trim())}`)
      }
    >
      <div className="frost-shimmer rounded-full p-[2px] bg-gradient-to-br from-frost-light to-frost/40 transition-transform duration-300 group-hover:scale-105 group-hover:from-frost group-hover:to-frost-deep">
        <div className="bg-white rounded-full p-1">
          {/* eslint-disable-next-line */}
          <img
            src={category.imageUrl}
            alt={category.name}
            width={40}
            height={40}
            className="object-cover w-10 h-10 md:w-16 md:h-16 rounded-full bg-mist aspect-square"
          />
        </div>
      </div>
      <p className="text-xs sm:text-sm line-clamp-2 font-medium text-ink/80 transition-colors group-hover:text-frost-deep">
        {category.name}
      </p>
    </div>
  );
};
