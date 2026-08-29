"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { Search, ShoppingCart, Snowflake } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ProfileMenu } from "./profileMenu";
import { BurgerMenu } from "./burgerMenu";
import { SearchBar } from "./searchBar";
import { MobileSearchBar } from "./mobileSearchBar";

export default function ClientNavbar() {
  const { isLoggedIn } = useAuthStore();
  const { cart } = useCartStore();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`px-2 md:px-0 sticky top-0 z-25 bg-ink transition-shadow duration-300 ${
        isScrolled ? "shadow-lg shadow-black/20" : ""
      } border-b border-white/10`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-2 md:gap-0 h-16">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 group">
              <Snowflake className="w-6 h-6 md:w-7 md:h-7 text-frost transition-transform duration-500 group-hover:rotate-90" />
              <span className="font-display font-semibold md:text-xl text-white">
                Beku<span className="text-frost">Mart</span>
              </span>
            </Link>
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex md:gap-6">
              {links.map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "text-frost font-semibold"
                        : "font-medium text-white/60 hover:text-white"
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
              className="md:hidden mr-2 cursor-pointer rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </div>
            {isLoggedIn && (
              <div className="relative mr-3 md:mr-0">
                <Link
                  href={`/cart?callbackUrl=${pathname}`}
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                {cart && cart.totalQuantity > 0 && (
                  <div
                    key={cart.totalQuantity}
                    className="absolute -top-2 -right-2 bg-berry rounded-full w-5 h-5 text-white text-xs flex items-center justify-center animate-pop"
                  >
                    {cart.totalQuantity}
                  </div>
                )}
              </div>
            )}

            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <div className="sm:flex items-center gap-3">
                <Link
                  href={`/login?callbackUrl=${pathname}`}
                  className="px-4 py-2 text-sm text-center text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="hidden md:block px-4 py-2 text-sm text-center text-white font-semibold bg-frost rounded-full hover:bg-frost-deep hover:shadow-md hover:shadow-frost/30 transition-all"
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
