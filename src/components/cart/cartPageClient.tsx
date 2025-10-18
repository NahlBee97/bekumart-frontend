"use client";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartItemCard from "./cartItemsCard";
import Link from "next/link";

// Accept the server-fetched cart data as a prop
export default function CartPageClient({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const router = useRouter();
  const { cart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleArrowClicked = () => {
    const forbiddenRoutes = ["/login", "/register", "/checkout"];
    if (callbackUrl && !forbiddenRoutes.includes(callbackUrl)) {
      router.push(callbackUrl);
    } else {
      router.push("/");
    }
  };

  // If the cart from the store is empty or null
  if (cart?.items.length === 0) {
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
            <section
              aria-labelledby="?-heading"
              className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm"
            >
              <ul role="list">
                {cart?.items.map((item) => (
                  <li key={item.id} className="flex mb-4">
                    <CartItemCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
            {/* Order Summary */}
            <section
              aria-labelledby="summary-heading"
              className="w-full bg-white border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm"
            >
              <h2
                id="summary-heading"
                className="text-xl font-bold text-blue-500"
              >
                Ringkasan Pesanan
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-semibold text-gray-700">
                    Subtotal
                  </dt>
                  <dd className="text-xl font-semibold text-blue-500">
                    Rp {cart?.totalPrice.toLocaleString("id-ID")}
                  </dd>
                </div>
                {/* Add more lines here for Shipping, Taxes, etc. */}
              </dl>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    window.location.href = "/checkout";
                  }}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center font-bold ${
                    isLoading ? "bg-gray-300" : "bg-blue-500"
                  } border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 transition-transform transform hover:scale-105`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
