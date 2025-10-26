"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { Search, ShoppingCart, Snowflake } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ProfileMenu } from "./profileMenu";
import { BurgerMenu } from "./burgerMenu";
import { SearchBar } from "./searchBar";
import { MobileSearchBar } from "./mobileSearchBar";

export default function ClientNavbar() {
  const { isLoggedIn } = useAuthStore();
  const { cart } = useCartStore();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const links = [
    { name: "Toko", link: "/shop" },
    { name: "Tentang Kami", link: "/about" },
    { name: "Hubungi Kami", link: "/contact" },
  ];

  if (isSearchOpen)
    return (
      <MobileSearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    );

  return (
    <header className="px-2 md:px-0 sticky top-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-2 md:gap-0 h-16">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-1 md:gap-2">
              <Snowflake className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              <Link href="/" className="font-semibold md:text-xl text-blue-500">
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
          <div className="hidden">
            <SearchBar />
          </div>

          {/* right side */}
          <div className="flex items-center gap-1 md:gap-8">
            <div
              className="md:hidden mr-2 cursor-pointer rounded-sm hover:bg-gray-100"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search />
            </div>
            {isLoggedIn && (
              <div className="relative mr-3 md:mr-0">
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

            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <div className="sm:flex items-center gap-2">
                <Link
                  href={`/login?callbackUrl=${pathname}`}
                  className="px-4 py-2 text-sm text-center text-blue-500 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="hidden md:block px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm text-center text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}

            <div className="md:hidden">
              <BurgerMenu links={links} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
