"use client";

import { notFound } from "next/navigation";
import { MainSection } from "./mainSection";
import { ReviewSection } from "./reviewSection";
import { IProduct, IProductPhoto } from "@/interfaces/dataInterfaces";

// The props interface remains the same.
export interface props {
  product: IProduct;
  photos: IProductPhoto[];
}

// The component now uses responsive Tailwind classes.
export default function ProductDetail({ product, photos }: props) {
  if (!product) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-10 mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-7xl lg:py-8">
        <MainSection product={product} photos={photos} />
        {/* you can get reviews on server page */}
        <ReviewSection product={product}/> 
      </div>
    </div>
  );
}
