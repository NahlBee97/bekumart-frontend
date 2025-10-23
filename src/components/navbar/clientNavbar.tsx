"use client";

import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { ShoppingCart, Snowflake } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { BurgerMenu } from "./burgerMenu";
import { ProfileMenu } from "./profileMenu";
import { usePathname } from "next/navigation";
import { SearchBar } from "./searchBar";

export default function ClientNavbar() {
  const { isLoggedIn } = useAuthStore();
  const { cart } = useCartStore();
  const pathname = usePathname();

  const links = [
    { name: "Toko", link: "/shop" },
    { name: "Tentang Kami", link: "/about" },
    { name: "Hubungi Kami", link: "/contact" },
  ];

  return (
    <header className="px-2 md:px-0 sticky top-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-2 md:gap-0 h-16">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-1 md:gap-2">
              <Snowflake className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              <Link
                href="/"
                className="font-semibold md:text-xl text-blue-500"
              >
                BekuMart
              </Link>
            </div>
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex md:gap-6">
              {links.map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    className={`text-sm dark:text-neutral-300 hover:text-blue-500 transition-colors ${
                      isActive
                        ? "text-blue-500 font-semibold "
                        : "font-medium text-neutral-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* center */}
          <SearchBar />

          {/* right side */}
          <div className="flex items-center gap-6 md:gap-8">
            {isLoggedIn && (
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
            )}

            {isLoggedIn && <ProfileMenu />}

            {!isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2">
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
              </div>
            )}
          </div>

          <div className="md:hidden">
            <BurgerMenu links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
