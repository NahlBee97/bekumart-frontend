"use client";

import { apiUrl } from "@/config";
import { IUser } from "@/interfaces/authInterfaces";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import axios from "axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { ShoppingCart, Snowflake } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Middle() {
  const token = getCookie("access_token") as string;
  const { cart, setCart } = useCartStore();
  const { user, isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (token) {
      const userData = jwtDecode<IUser>(token);
      login(userData);
    }
  }, [token, login]);

  useEffect(() => {
    try {
      if (token) {
        const fetchUserCart = async () => {
          const userData = jwtDecode<IUser>(token);
          const userId = userData.id;
          const { data } = await axios.get(`${apiUrl}/api/carts/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(data.data);
        };

        fetchUserCart();
      }
    } catch (err) {
      alert(err);
    }
  }, [token, setCart]);

  return (
    <div className="w-full">
      <div
        className="
        w-full
        flex flex-col md:flex-row
        items-center
        justify-between
        gap-1 sm:gap-6
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[150px] 2xl:px-[300px]
        py-4 sm:py-5 md:py-6
        border-b border-neutral-100
      "
      >
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Snowflake className="w-8 h-8 text-blue-400" />
          <p className="font-semibold text-2xl sm:text-3xl xl:text-[32px] text-black">
            BekuMart
          </p>
          {/* Cart/Wishlist - display on mobile */}
          <div className="flex md:hidden items-center gap-4 sm:gap-6 w-full md:w-auto justify-end">
            {/* Avatar */}
            {!isLoggedIn ? (
              <div className="flex gap-2 sm:gap-3 xl:gap-2">
                <Link href="/login" className="hover:text-black">
                  Sign In
                </Link>
                <p>/</p>
                <Link href="/register" className="hover:text-black">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 sm:gap-3 xl:gap-2">
                <Link href="/profile">
                  {/* eslint-disable-next-line */}
                  <img
                    src={user?.imageUrl}
                    alt="profile-picture"
                    className="rounded-full w-6 h-6 border-black border-solid border-1"
                  />
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Link href={"/cart"} className="flex items-center">
                    <ShoppingCart className="w-6 h-6" />
                  </Link>
                  <div
                    className="
                absolute -top-1 -right-1
                bg-red-700
                rounded-full
                w-4 h-4
                text-white
                text-[10px]
                flex items-center justify-center
              "
                  >
                    {cart ? cart.totalQuantity : 0}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-neutral-500">Shopping Cart:</p>
                  <p className="text-sm font-medium">
                    IDR {cart ? cart.totalPrice : 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-end">
          {!isLoggedIn ? (
            <div className="flex gap-2 sm:gap-3 xl:gap-2">
              <Link href="/login" className="hover:text-black">
                Sign In
              </Link>
              <p>/</p>
              <Link href="/register" className="hover:text-black">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 sm:gap-3 xl:gap-2">
              <Link href="/profile">
                {/* eslint-disable-next-line */}
                <img
                  src={user?.imageUrl}
                  alt="profile-picture"
                  className="rounded-full w-8 h-8 border-black border-solid border-1"
                />
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Link href={"/cart"} className="flex items-center">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                {cart && (
                  <div
                    className="
                absolute -top-1 -right-1
                bg-red-700
                rounded-full
                w-4 h-4
                text-white
                text-[10px]
                flex items-center justify-center
              "
                  >
                    {cart ? cart.totalQuantity : 0}
                  </div>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-neutral-500">Shopping Cart:</p>
                <p className="text-sm font-medium">
                  Rp {cart ? cart.totalPrice.toLocaleString("id-ID") : 0}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
