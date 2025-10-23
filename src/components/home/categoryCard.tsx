"use client"

import { ICategory } from "@/interfaces/dataInterfaces";
import { useRouter } from "next/navigation";

export const CategoryCard = ({category}: {category: ICategory}) => {
  const router = useRouter();
    return (
      <div
        className="flex flex-col items-center justify-start p-4 md:p-2 gap-2 border border-gray-200 text-center group w-30 md:w-24 hover:shadow-md"
        onClick={() =>
          router.push(`/shop?search=${encodeURIComponent(category.name.trim())}`)
        }
      >
        {/* eslint-disable-next-line */}
        <img
          src={category.imageUrl}
          alt={category.name}
          width={40}
          height={40}
          className="object-cover w-8 h-8 md:w-16 md:h-16 text-xs rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:bg-slate-200 aspect-square"
        />
        <p className="text-xs sm:text-sm line-clamp-2 font-medium text-slate-700 transition-colors group-hover:text-blue-600">
          {category.name}
        </p>
      </div>
    );
}