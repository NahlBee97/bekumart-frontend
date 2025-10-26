"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { MessageSquareIcon } from "lucide-react";
import { useState } from "react";
import { StickyAddToCartSkeleton } from "./stickyAddToCartSkeleton";
import toast from "react-hot-toast";
import { ConfirmModal } from "../confirmModal";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/dataInterfaces";
import { QuantitySelector } from "./quantitySelector";
import { AddToCartButton } from "./addToCartButton";

export const StickyAddToCart = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

  // Show skeleton if isLoading is true or product is not available yet
  if (isLoading) {
    return <StickyAddToCartSkeleton />;
  }

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      if (!isLoggedIn) {
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <div className="flex p-2 items-center border border-gray-300 text-gray-500 rounded-md">
              <MessageSquareIcon className="w-6 h-6" />
            </div>

            {/* Quantity Selector */}
            <QuantitySelector
              isDisable={isLoading}
              quantity={quantity}
              onIncrease={incrementQuantity}
              onDecrease={decrementQuantity}
            />
            {/* Add to Cart Button */}
            <AddToCartButton
              isLoading={isLoading}
              onAdd={handleAddToCart}
              name="Tambahkan"
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isShowConfirmModal}
        onClose={() => setIsShowConfirmModal(false)}
        title="Tidak bisa menambahkan kedalam keranjang"
        confirmText="Login"
        onConfirm={() => router.push("/login")}
      />
    </div>
  );
};
