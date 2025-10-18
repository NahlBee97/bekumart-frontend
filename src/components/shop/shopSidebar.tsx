"use client";

import { ICategory } from "@/interfaces/productInterfaces";
import { getCategories } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceRangeFilter } from "./priceRange";
import { RatingFilter } from "./ratingFilter";

export const ShopSidebar = () => {
  const queryParams = useSearchParams();
  const keyword = queryParams.get("search");
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleClick = (category: string) => {
    const params = new URLSearchParams(queryParams.toString());

    if (category) params.set("search", category.toString());
    else params.delete("search");

    // Navigate with new params
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Kategori
          </h3>
          <div className="space-y-2">
            <div
              className={`flex text-sm items-center gap-1 ${
                !keyword && "text-blue-500 font-semibold "
              } cursor-pointer hover:text-blue-500`}
              onClick={() => {
                const params = new URLSearchParams(queryParams.toString());
                params.delete("search");
                router.push(`/shop?${params.toString()}`);
              }}
            >
              Semua
            </div>
            {categories.map((c) => {
              const isActive = keyword === c.name;
              return (
                <div
                  className={`flex text-sm items-center gap-1 ${
                    isActive && "text-blue-500 font-semibold "
                  } cursor-pointer hover:text-blue-500`}
                  key={c.id}
                  onClick={() => handleClick(c.name)}
                >
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
        <PriceRangeFilter />
        <RatingFilter />
        <button
          onClick={() => router.push("/shop")}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={queryParams.size === 0}
        >
          Hapus Filter
        </button>
      </div>
    </aside>
  );
};
