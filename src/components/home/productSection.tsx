import { IProduct } from "@/interfaces/dataInterfaces";
import { Filter } from "lucide-react";
import { useState } from "react";

import { FilterModal } from "../shop/filterModal";
import { ProductCard } from "../products/productCard";
import { NoProduct } from "./noProduct";

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
    <section className="w-full bg-white  border border-slate-200  rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="flex justify-between">
        <h2 className="text-base font-semibold text-blue-500 mb-4 uppercase tracking-wider">
          {products.length === 0 ? "" : title}
        </h2>
        <Filter
          className="md:hidden border border-gray-300 text-gray-400 p-1 rounded-xs shadow-xs hover:bg-slate-50 cursor-pointer"
          onClick={() => setIsFilterOpen(true)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </section>
  );
};
