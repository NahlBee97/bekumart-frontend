"use client";

import { ICategory } from "@/interfaces/productInterfaces";
import { getCategories } from "@/lib/data";
import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ShopSidebar = () => {
  const { isLoading } = useAuthStore();
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    if (isLoading) return;
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, [isLoading]);
  return (
    <aside className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Kategori
          </h3>
          <div className="space-y-2">
            <Link
              href="#"
              className="block text-sm hover:text-primary transition-colors"
            >
              Semua
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href="#"
                className="block text-sm hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Filter
          </h3>
          <div>
            {/* Price Filter */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Max Price:{" "}
                <span className="font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(500)}
                </span>
              </label>
              {/* <input
                id="price"
                type="range"
                min="0"
                max={500}
                value={500}
                //   onChange={handleFilterChange(setPriceRange)}
                className="mt-2 w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              /> */}
            </div>

            {/* Rating Filter */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {/* Min Rating: {minRating.toFixed(1)} ★ */}
              </label>
              {/* <input
                id="rating"
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={0}
                //   onChange={handleFilterChange(setMinRating)}
                className="mt-2 w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
