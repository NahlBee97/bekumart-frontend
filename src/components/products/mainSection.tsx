"use client";

import { ShoppingCartIcon } from "lucide-react";
import { ImageSlider } from "./imageSlider";
import ConfirmModal from "../confirmModal";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import { StarRatingDetail } from "./starRating";
import { IProduct, IProductPhoto } from "@/interfaces/dataInterfaces";

export interface props {
  product: IProduct;
  photos: IProductPhoto[];
}

export const MainSection = ({ product, photos }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, accessToken } = useAuthStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      if (!accessToken) {
        setIsShowConfirmModal(true);
        return;
      }
      if (!user) return;
      await addToCart(user.id, product.id, quantity);
      toast.success("Berhasil menambahkan");
    } catch (error) {
      toast.error("Gagal menambahkan ke dalam keranjang");
      console.error("Gagal menambahkan ke dalam keranjang:", error);
      throw new Error("Gagal menambahkan kedalam keranjang");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column: Image Slider */}
        <ImageSlider photos={photos} />

        {/* Right Column: Product Details */}
        <div className="flex flex-col justify-between gap-4">
          <div className="md:flex flex-col gap-1">
            <h1 className="text-xl font-semibold uppercase text-gray-800">
              {product.name}
            </h1>
            <div className="flex text-sm gap-2">
              <StarRatingDetail rating={product.rating} />
              <p className="border-l-2 border-gray-500 pl-2">
                {product.sale} Terjual
              </p>
            </div>
            <div className="bg-gray-50 p-2 md:p-4 rounded-md">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-500">
                Rp {product.price.toLocaleString()}
              </h2>
            </div>
            <div className="space-y-2 mt-2">
              <h2 className="md:text-lg font-semibold">
                Deskripsi Produk:
              </h2>
              <p>
                <span className="font-semibold">Berat bersih: </span>
                {product.weightInKg * 1000} Gram
              </p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-6">
            <p>
              <span className="font-semibold">Berat bersih: </span>
              {product.weightInKg * 1000} Gram
            </p>
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="w-35 flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decrementQuantity}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition duration-200 focus:outline-none"
                  aria-label="Decrement quantity"
                >
                  -
                </button>
                <span className="px-4 py-2 text-center w-16 bg-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition duration-200 focus:outline-none"
                  aria-label="Increment quantity"
                >
                  +
                </button>
              </div>
              <p>Tersedia {product.stock}</p>
            </div>

            <button
              className=" flex justify-center items-center gap-2 w-60 bg-blue-500 text-white rounded py-3 px-6 hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              {!isLoading ? (
                <>
                  <ShoppingCartIcon /> Masukkan Keranjang
                </>
              ) : (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              )}
            </button>
          </div>
        </div>
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
