"use client";

import { IProduct, IProductPhoto, IReview } from "@/interfaces/dataInterfaces";

import { notFound } from "next/navigation";
import { MainSection } from "./mainSection";
import { ReviewSection } from "./reviewSection";
import { StickyAddToCart } from "./stickyAddToCart";

interface props {
  product: IProduct;
  photos: IProductPhoto[];
  reviews: IReview[];
  isLoading: boolean;
}

export function ProductClient({
  product,
  photos,
  reviews,
  isLoading,
}: props) {
  if (!product) return notFound();

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-5 md:gap-10 mx-auto max-w-2xl md:py-4 lg:max-w-7xl lg:py-8">
        <MainSection product={product} photos={photos} />
        <ReviewSection reviews={reviews} isLoading={isLoading} />
        <StickyAddToCart product={product} />
      </div>
    </div>
  );
}
