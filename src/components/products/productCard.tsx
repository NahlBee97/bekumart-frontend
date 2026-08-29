"use client";

import { useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/dataInterfaces";

import { StarIcon } from "./starRating";
import { formatNumberCompact } from "@/helper/functions";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const mainPhoto: string | undefined = product.productPhotos.find(
    (photo) => photo.isDefault === true
  )?.imageUrl;
  return (
    <div
      className="group min-h-[250px] relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1 transition-all duration-300 ease-out bg-white flex flex-col cursor-pointer"
      onClick={() => {
        router.push(`/products/${product.id}`);
      }}
    >
      <div className="relative flex justify-center items-center w-full overflow-hidden bg-mist">
        {/* eslint-disable-next-line */}
        <img
          src={
            mainPhoto
              ? mainPhoto
              : "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
          }
          alt="product-image"
          className="h-50 w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 font-mono text-[10px] font-medium bg-ink/70 text-frost-light px-1.5 py-0.5 rounded-md backdrop-blur-sm">
          -18°C
        </span>
      </div>
      <div className="p-2.5 flex-grow flex flex-col">
        <h3 className="md:text-m text-sm text-ink/80 font-medium line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-col gap-1 mt-1">
          <p className="md:text-lg text-base font-display font-semibold text-berry">
            Rp {product.price.toLocaleString()}
          </p>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center text-ink/70 text-xs font-semibold">
              {product.rating}/5 <StarIcon filled />
            </p>
            <p className="text-xs text-ink/50">
              {formatNumberCompact(product.sale)} terjual
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
