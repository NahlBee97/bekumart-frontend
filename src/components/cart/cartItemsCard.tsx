// components/CartItem.tsx

"use client";

import { ICartItem } from "@/interfaces/cartInterfaces";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const CartItemCard: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { user } = useAuthStore();
  const { updateItemQuantity, deleteItem } = useCartStore();
  // 1. Manage quantity with local state for instant UI feedback
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  // Sync local state with prop when item quantity changes
  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  // Debounced update effect
  useEffect(() => {
    // Don't run on the initial render or if quantities match
    if (localQuantity === item.quantity) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        await updateItemQuantity(user.id, item.id, localQuantity);
      } catch (error) {
        // Revert to item quantity on error
        setLocalQuantity(item.quantity);
        console.error("Failed to update quantity:", error);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuantity, item.quantity, user.id, item.id, updateItemQuantity]);

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
          src={item.product.imageUrl}
          alt="product image"
          className="w-24 h-24 border border-gray-300 rounded-md object-cover sm:w-32 sm:h-32"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative flex justify-between sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <h3 className="text-base font-medium line-clamp-2 text-gray-800">
            <a href={`/products/${item.product.id}`}>{item.product.name}</a>
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between text-sm">
          <p className="font-medium text-blue-500">
            Rp {item.product.price.toLocaleString("id-ID")}
          </p>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              {localQuantity === 1 ? (
                <button
                  type="button"
                  onClick={() => deleteItem(user.id, item.id)}
                  className="p-2 font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                  disabled={item.quantity > 1}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                  disabled={localQuantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
              )}
              <span
                className={`px-4 text-center text-sm font-medium text-gray-700 tabular-nums`}
              >
                {localQuantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
