"use client";

import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartItemsSection } from "./cartItemsSection";
import { CartSummarySection } from "./cartSummarySection";
import { CartEmptyState } from "./cartEmptyState";

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
  };

  // If the cart from the store is empty or null
  if (cart?.items?.length === 0) return <CartEmptyState/>

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-gray-800">
        <div className="md:px-8 md:py-4 flex bg-slate-50 items-center gap-2 p-2">
          <ArrowLeft
            className="md:hidden h-6 w-6 text-blue-500"
            onClick={handleArrowClicked}
          />
          <h1 className=" text-xl md:text-3xl font-bold tracking-tight text-blue-500">
            Keranjang Belanja
          </h1>
        </div>
        <main className="bg-slate-50 min-h-screen pb-4 pt-2">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-5 mx-auto max-w-2xl py-4 sm:py-0 lg:max-w-7xl ">
            {/* Cart Items List */}
            <div className="md:col-span-2">
              <CartItemsSection cart={cart} isCartLoading={isCartLoading} />
            </div>
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
