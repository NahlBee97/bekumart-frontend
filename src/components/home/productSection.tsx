"use client";

import { IProduct } from "@/interfaces/dataInterfaces";
import { Filter } from "lucide-react";
import { useState } from "react";

import { FilterModal } from "../shop/filterModal";
import { ProductCard } from "../products/productCard";
import { NoProduct } from "./noProduct";
import { Reveal } from "@/components/reveal";

export const ProductSection = ({
  products,
  title,
}: {
  products: IProduct[];
  title: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  if (products.length === 0) return <NoProduct />;

  return (
    <Reveal as="section" className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-sm shadow-ink/5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-sm font-semibold text-ink uppercase tracking-wider">
          {products.length === 0 ? "" : title}
        </h2>
        <Filter
          className="md:hidden border border-slate-200 text-fog p-1.5 rounded-full shadow-sm hover:bg-frost-light hover:text-frost-deep active:scale-90 transition-all cursor-pointer"
          onClick={() => setIsFilterOpen(true)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </Reveal>
  );
};
