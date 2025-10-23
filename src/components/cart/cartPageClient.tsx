"use client";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CartItemsSection } from "./cartItemsSection";
import { CartSummarySection } from "./cartSummarySection";

// Accept the server-fetched cart data as a prop
export default function CartPageClient({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const router = useRouter();
  const { cart, isCartLoading } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleArrowClicked = () => {
    const forbiddenRoutes = ["/login", "/register", "/checkout"];
    if (callbackUrl && !forbiddenRoutes.includes(callbackUrl)) {
      router.push(callbackUrl);
    } else {
      router.push("/");
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    router.push("/checkout");
  }

  // If the cart from the store is empty or null
  if (cart?.items?.length === 0) {
    return (
      <div className="bg-white min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <ShoppingCart
          className="w-24 h-24 text-gray-300 mb-6"
          strokeWidth={1}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Keranjang Belanja Kosong
        </h1>
        <p className="text-gray-500 mb-6">
          Sepertinya kamu belum menambahkan sesuatu, mari belanja!
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Lanjut Belanja
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <ArrowLeft
          className="md:hidden h-6 w-6 mt-2 ml-2 text-blue-500"
          onClick={handleArrowClicked}
        />
        <main className="bg-slate-50 min-h-screen">
          <div className="flex flex-col gap-10 mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-7xl lg:py-8">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-blue-500 sm:text-4xl">
              Keranjang Belanja
            </h1>
            {/* Cart Items List */}
            <CartItemsSection cart={cart} isCartLoading={isCartLoading} />
            {/* Order Summary */}
            <CartSummarySection
              isLoading={isLoading}
              isCartLoading={isCartLoading}
              cart={cart}
              onCheckout={handleCheckout}
            />
          </div>
        </main>
      </div>
    </>
  );
}
