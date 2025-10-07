"use client";

import { IProduct } from "@/interfaces/productInterfaces";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { MessageSquareIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { StickyAddToCartSkeleton } from "./stickyAddToCartSkeleton";

interface StickyAddToCartProps {
  product: IProduct; // Make product optional
}

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  product,
}) => {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      await addToCart(user.id, product.id, quantity);
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan ke dalam keranjang");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex p-2 items-center border border-gray-300 text-gray-500 rounded-md">
              <MessageSquareIcon className="w-6 h-6" />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                disabled={isLoading}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition duration-200 focus:outline-none"
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
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition duration-200 focus:outline-none"
                aria-label="Increment quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex gap-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              <PlusIcon />
              <p>Keranjang</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;
