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
      <div className="container mx-auto p-4">
        <MainSection product={product} photos={photos} />
        <ReviewSection reviews={reviews} isLoading={isLoading} />
        <StickyAddToCart product={product} />
      </div>
    </div>
  );
}
