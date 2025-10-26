"use client";

import { PriceRangeFilter } from "./priceRange";
import { RatingFilter } from "./ratingFilter";
import { ICategory } from "@/interfaces/dataInterfaces";
import { CategoryFilter } from "./categoryFilter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CommonButton } from "../buttons/commonButton";

export const ShopSidebar = ({categories}: {categories: ICategory[]}) => {
  const queryParams = useSearchParams();
  const router = useRouter();

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="space-y-6">
        <CategoryFilter categories={categories} />
        <PriceRangeFilter onApply={() => null} />
        <RatingFilter onApply={() => null} />
        <CommonButton onClick={() => router.push("/shop")} isDisable={queryParams.size === 0} buttonText="Hapus Filter" />
      </div>
    </aside>
  );
};
