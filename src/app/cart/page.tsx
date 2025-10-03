"use client";

import type { NextPage } from "next";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";

const CartPage: NextPage = () => {
    const { user } = useAuthStore();
    const { cart, updateItemQuantity, deleteItem } = useCartStore();

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
          href="/products"
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
                className="lg:col-span-7 bg-white rounded-lg shadow-sm"
              >
                <ul role="list" className="divide-y divide-gray-300">
                  {cart?.items.map((items) => (
                    <li key={items.id} className="flex p-4 sm:p-6">
                      <div className="flex-shrink-0">
                        {/* eslint-disable-next-line */}
                        <img
                          src={items.product.imageUrl}
                          alt="product image"
                          className="w-24 h-full border border-gray-300 rounded-md object-cover sm:w-32 sm:h-32"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative flex justify-between sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <h3 className="text-base font-semibold text-gray-800">
                              <a href={`/products/${items.product.id}`}>
                                {items.product.name}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Rp {items.product.price.toLocaleString("id-ID")}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {items.product.weightInKg} kg
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center border border-gray-300 rounded-md w-fit">
                              <button
                                type="button"
                                onClick={() =>
                                  updateItemQuantity(
                                    user.id,
                                    items.id,
                                    items.quantity - 1
                                  )
                                }
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
                                disabled={items.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 text-center text-sm font-medium text-gray-700 tabular-nums">
                                {items.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateItemQuantity(
                                    user.id,
                                    items.id,
                                    items.quantity + 1
                                  )
                                }
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Total:{" "}
                            <span className="font-medium text-gray-800">
                              Rp{" "}
                              {(
                                items.product.price * items.quantity
                              ).toLocaleString("id-ID")}
                            </span>
                          </p>
                          <button
                            type="button"
                            onClick={() => deleteItem(user.id, items.id)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order Summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-4 bg-white rounded-lg shadow-sm lg:mt-0 lg:col-span-5 p-6"
              >
                <h2
                  id="summary-heading"
                  className="text-xl font-bold text-blue-500"
                >
                  Order Summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-semibold text-gray-700">Subtotal</dt>
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
