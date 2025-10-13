"use client";

import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { ShoppingCart, Snowflake } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect } from "react";
import { BurgerMenu } from "./burgerMenu";
import { ProfileMenu } from "./profileMenu";
import { usePathname } from "next/navigation";
import { getCartData } from "@/lib/data";

export default function Header() {
  const { cart, setCart } = useCartStore();
  const { user, isLoggedIn, isLoading } = useAuthStore();
  const pathname = usePathname();

  const links = [
    { name: "Toko", link: "/" },
    { name: "Tentang Kami", link: "/about" },
    { name: "Hubungi Kami", link: "/contact" },
  ];

  useEffect(() => {
    if (!isLoading) {
      try {
        const fetchUserCart = async () => {
          const cart = await getCartData(user.id);

          setCart(cart);
        };

        fetchUserCart();
      } catch (error) {
        console.error("Failed to fetch user cart or decode token:", error);
        throw new Error("Failed to fetch user cart or decode token");
      }
    }
  }, [user, setCart, isLoading]);

  return (
    <div className="w-full">
      <div
        className="
        w-full
        flex md:flex-row
        items-center
        justify-between
        gap-1 sm:gap-6
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[150px] 2xl:px-[300px]
        py-4 sm:py-5 md:py-6
        border-b border-neutral-100
      "
      >
        <div className="flex items-center gap-2 md:w-auto">
          <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 text-blue-400" />
          <p className="font-semibold text-xl sm:text-2xl xl:text-3xl text-blue-500">
            BekuMart
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center justify-end md:justify-end md:gap-4 gap-2 md:w-auto md:mt-0">
            {!isLoggedIn ? (
              <>
                <Link
                  href={`/login?callbackUrl=${pathname}`}
                  className="px-3 py-1 md:px-5 md:py-2 text-xs md:text-base text-center text-blue-500 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 md:px-5 md:py-2 text-xs md:text-base text-center text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Daftar
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                <ProfileMenu />
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Link
                  href={`/cart?callbackUrl=${pathname}`}
                  className="flex items-center mr-1"
                >
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                {/* Refined Badge Display: Only shows if items are in the cart */}
                {cart && cart.totalQuantity > 0 && (
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
                    {cart.totalQuantity}
                  </div>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-neutral-500">Keranjang Belanja:</p>
                <p className="text-sm font-medium">
                  Rp {cart ? cart.totalPrice.toLocaleString("id-ID") : 0}
                </p>
              </div>
            </div>
          )}
          <div className="md:hidden">
            <BurgerMenu links={links} />
          </div>
        </div>
      </div>
    </div>
  );
}
