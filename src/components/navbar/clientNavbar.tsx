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
import { SearchBar } from "./searchBar";

export default function ClientNavbar() {
  const { user, isLoggedIn, isLoading } = useAuthStore();
  const { cart, setCart } = useCartStore();
  const pathname = usePathname();

  const links = [
    { name: "Toko", link: "/shop" },
    { name: "Tentang Kami", link: "/about" },
    { name: "Hubungi Kami", link: "/contact" },
  ];

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) return;
    try {
      const fetchUserCart = async () => {
        const cart = await getCartData(user.id);
        setCart(cart);
      };
      fetchUserCart();
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
      throw new Error("Failed to fetch user cart");
    }
  }, [user, setCart, isLoading, isLoggedIn]);

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <Link
                href="/"
                className="font-semibold text-xl sm:text-2xl text-blue-500"
              >
                BekuMart
              </Link>
            </div>
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex md:gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* search bar */}
          <SearchBar />
          
          {/* Right Section: Auth, Cart, and Burger Menu */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Auth Buttons or Profile Menu */}
            <div className="hidden sm:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    href={`/login?callbackUrl=${pathname}`}
                    className="px-4 py-2 text-sm text-center text-blue-500 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm text-center text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              ) : (
                // Cart Icon and Info - Shown only when logged in
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <Link
                      href={`/cart?callbackUrl=${pathname}`}
                      className="flex items-center"
                    >
                      <ShoppingCart className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                    </Link>
                    {cart && cart.totalQuantity > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-white text-xs flex items-center justify-center">
                        {cart.totalQuantity}
                      </div>
                    )}
                  </div>
                  <ProfileMenu />
                </div>
              )}
            </div>

            {/* Burger Menu - Shown only on mobile */}
            <div className="md:hidden">
              <BurgerMenu links={links} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
