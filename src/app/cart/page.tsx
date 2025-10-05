"use client";

import type { NextPage } from "next";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import CartItemCard from "@/components/cart/cartItemsCard";

const CartPage: NextPage = () => {
  const { cart } = useCartStore();

  // Empty Cart View
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

  // Main Cart View
  return (
    <>
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-blue-500 sm:text-4xl mb-8">
              Keranjang Belanja
            </h1>

            <div className="flex flex-col lg:gap-8">
              {/* Cart Items List */}
              <section
                aria-labelledby="cart-heading"
                className="lg:col-span-7"
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
                className="bg-white lg:mt-0 lg:col-span-5 py-4"
              >
                <h2
                  id="summary-heading"
                  className="text-xl font-bold text-blue-500"
                >
                  Order Summary
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
                    type="submit"
                    onClick={() => (window.location.href = "/checkout")}
                    className="w-full font-bold bg-blue-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base  text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CartPage;
