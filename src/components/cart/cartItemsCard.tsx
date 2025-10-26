"use client";

import toast from "react-hot-toast";
import { ICartItem } from "@/interfaces/dataInterfaces";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { QuantitySelector } from "../products/quantitySelector";

export const CartItemCard = ({ item }: { item: ICartItem }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { updateItemQuantity, deleteItem } = useCartStore();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync local state with prop when item quantity changes
  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  // Debounced update effect
  useEffect(() => {
    if (localQuantity === item.quantity) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setIsLoading(true);
        await updateItemQuantity(user.id, item.id, localQuantity);
        setIsLoading(false);
        toast.success("Berhasil merubah jumlah");
      } catch (error) {
        // Revert to item quantity on error
        setLocalQuantity(item.quantity);
        toast.error("Berhasil merubah jumlah");
        console.error("Failed to update quantity:", error);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuantity, item.quantity, user, item.id, updateItemQuantity]);

  const handleDecrement = () => {
    setLocalQuantity((prev) => Math.max(1, prev - 1)); // Prevents quantity from going below 1
  };

  const handleIncrement = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line */}
        <img
          src={
            item.product?.productPhotos?.find(
              (photo) => photo.isDefault === true
            )?.imageUrl
          }
          alt="product image"
          className="w-24 h-24 border border-gray-300 rounded-md object-cover sm:w-32 sm:h-32"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative flex justify-between sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <h3
            className="text-base font-medium line-clamp-2 text-gray-800"
            onClick={() => router.push(`/products/${item.product?.id}`)}
          >
            {item.product?.name}
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between text-sm">
          <p className="font-medium text-blue-500">
            Rp {item.product?.price.toLocaleString("id-ID")}
          </p>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            {isLoading ? (
              <div className="h-9 w-35 animate-pulse rounded-md bg-gray-200"></div>
            ) : (
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                {localQuantity === 1 && (
                  <button
                    type="button"
                    onClick={() => deleteItem(user.id, item.id)}
                    className="p-2 font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                    disabled={item.quantity > 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <QuantitySelector
                  isDisable={localQuantity <= 1}
                  quantity={localQuantity}
                  onDecrease={handleDecrement}
                  onIncrease={handleIncrement}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
