"use client";

import { IProduct, IProductPhoto } from "@/interfaces/dataInterfaces";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ConfirmModal } from "../confirmModal";
import { ImageSlider } from "./imageSlider";
import { ProductDetails } from "./productDetails";

export interface props {
  product: IProduct;
  photos: IProductPhoto[];
}

export const MainSection = ({ product, photos }: props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  
  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column: Image Slider */}
        <ImageSlider photos={photos} />

        {/* Right Column: Product Details */}
        <ProductDetails product={product} openConfirmModal={() => setIsShowConfirmModal(true)}/>
      </div>
      <ConfirmModal
        isOpen={isShowConfirmModal}
        onClose={() => setIsShowConfirmModal(false)}
        title="Tidak bisa menambahkan kedalam keranjang"
        confirmText="Login"
        onConfirm={() => router.push(`/login?callbackUrl=${pathname}`)}
      />
    </section>
  );
};
