"use client";

import Hero from "./hero";
import CategorySection from "./categorySection";
import { ProductSection } from "./productSection";
import { ICategory, IProduct } from "@/interfaces/dataInterfaces";

interface ProductPageClientProps {
  products: IProduct[];
  categories: ICategory[];
}

export default function HomeClient({
  products,
  categories,
}: ProductPageClientProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-4 md:gap-10 mx-auto max-w-2xl px-2 py-4 md:px-4 md:py-6 lg:max-w-7xl">
        <Hero />
        <CategorySection categories={categories} />
        <ProductSection title="Produk Terlaris" products={products} />
      </div>
    </div>
  );
}
