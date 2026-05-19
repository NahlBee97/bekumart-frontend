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
    <div className="bg-slate-50 ">
      <div className="p-2 container mx-auto space-y-4" >
        <Hero />
        <CategorySection categories={categories} />
        <ProductSection title="Produk Terlaris" products={products} />
      </div>
    </div>
  );
}
