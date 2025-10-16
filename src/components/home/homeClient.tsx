"use client";

import { IProduct, ICategory } from "@/interfaces/productInterfaces";
import Hero from "./hero";
import CategorySection from "./categorySection";
import { ProductSection } from "./productSection";

interface ProductPageClientProps {
  products: IProduct[];
  categories: ICategory[];
}

export default function HomeClient({
  products,
  categories,
}: ProductPageClientProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col gap-10 mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
        <Hero />
        <CategorySection categories={categories} />
        <ProductSection title="Produk Terlaris" products={products} />
      </div>
    </div>
  );
}
