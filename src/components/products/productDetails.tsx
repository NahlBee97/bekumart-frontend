import toast from "react-hot-toast";
import { useState } from "react";
import { IProduct } from "@/interfaces/dataInterfaces";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";

import { StarRatingDetail } from "./starRating";
import { QuantitySelector } from "./quantitySelector";
import { AddToCartButton } from "./addToCartButton";

interface props {
  product: IProduct;
  openConfirmModal: () => void;
}

export const ProductDetails = ({ product, openConfirmModal }: props) => {
  const { user, accessToken } = useAuthStore();
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        openConfirmModal();
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
          <h2 className="md:text-lg font-semibold">Deskripsi Produk:</h2>
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
          <QuantitySelector
            isDisable={isLoading}
            quantity={quantity}
            onDecrease={decrementQuantity}
            onIncrease={incrementQuantity}
          />
          <p>Tersedia {product.stock}</p>
        </div>
        <AddToCartButton isLoading={isLoading} onAdd={handleAddToCart} name="Masukkan Keranjang" />
      </div>
    </div>
  );
};
