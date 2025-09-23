import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  return (
    <button
      aria-label="Add to cart"
      className="w-12 h-12 bg-blue-300 text-gray-800 rounded-full flex justify-center items-center hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50"
      onClick={(event) => {
        event.stopPropagation();
        addToCart(user.id, productId);
      }}
    >
      <ShoppingCart className="w-6 h-6" />
    </button>
  );
}
