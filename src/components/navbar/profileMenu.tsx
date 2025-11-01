"use client"

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export const ProfileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeLink, setActiveLink] = useState("");
  const links = [
    { name: "Akun", link: "/profile" },
    { name: "Riwayat Pesanan", link: "/profile/orders" },
  ];

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Profile Image Button */}
      <button
        className="flex items-center justify-center"
        type="button"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {!user.imageUrl ? (
          <User className="cursor-pointer" />
        ) : (
          // eslint-disable-next-line
          <img
            src={user?.imageUrl}
            alt="profile-picture"
            className="rounded-full w-6 h-6 md:w-10 md:h-10 object-cover border border-slate-400 dark:border-slate-500 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-white/10 focus:outline-none transition ease-out duration-100 z-200 ${
          isOpen
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-2" role="none">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => {
                setActiveLink(link.link);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeLink === link.link
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-current={activeLink === link.link ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}

          {/* Separator */}
          <div className="border-t border-slate-200 dark:border-slate-700 my-1" />

          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
