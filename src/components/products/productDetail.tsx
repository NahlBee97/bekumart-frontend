"use client"

import { IProduct, IProductPhoto } from "@/interfaces/productInterfaces";
import { StarRating } from "@/components/products/starRating";
import StickyAddToCart from "@/components/products/stickyAddToCart";
import ImageSlider from "@/components/products/imageSlider";
import { ArrowLeft } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

export interface PageProps {
  product: IProduct;
  photos: IProductPhoto[];
}

export default function ProductDetail({ product, photos }: PageProps) {
  const router = useRouter();

  if (!product) return notFound();

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-12">
        <ArrowLeft
          className="h-6 w-6 mt-2 ml-2 text-blue-500"
          onClick={() => router.push("/")}
        />
        {/* Product Image Section */}
        <div className="relative w-full aspect-square p-8 md:p-12 flex items-center justify-center">
          <ImageSlider photos={photos} />
        </div>

        {/* Product Main title Section */}
        <div className="flex flex-col justify-center border-b-4 border-gray-300">
          <div className="w-full p-4">
            <p className="text-2xl md:text-4xl font-extrabold text-blue-500 mb-2">
              Rp {product?.price.toLocaleString()}
            </p>
            <h1 className="text-xl mt-2 mb-4">{product?.name}</h1>
            <div className="flex gap-2">
              <StarRating rating={product?.rating as number} />
              <p className="text-xs text-gray-800">{product?.sale} terjual</p>
            </div>
          </div>
        </div>

        {/* Product riview Section */}
        <div className="flex flex-col justify-center border-b-4 border-gray-300">
          <div className="w-full p-4">
            <p className="text-xl md:text-3xl font-semibold text-blue-500 mb-2">
              Ulasan Pembeli
            </p>
            {/* 5 riview card */}
          </div>
        </div>

        {/* Product riview Section */}
        <div className="flex flex-col justify-center">
          <div className="w-full p-4">
            <p className="text-xl md:text-3xl font-semibold text-blue-500 mb-2">
              Deskripsi Product
            </p>
            <div className="text-gray-800 mb-2">
              <p>Kategori : {product?.category.name}</p>
              <p>Berat : {product?.weightInKg} Kg</p>
            </div>
            <p className="line-clamp-5">{product?.description}</p>
          </div>
        </div>

        {/* Price and Action Button */}
        <div className="mt-auto pt-6 border-gray-200">
          <StickyAddToCart product={product as IProduct} />
        </div>
      </div>
    </main>
  );
}
