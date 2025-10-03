import useAuthStore from "@/stores/useAuthStore";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import type { FC } from "react";

// You can move this component to its own file and import it
export const ProfileMenu: FC = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeLink, setActiveLink] = useState("");
  const links = [
    { name: "Profile", link: "/profile" },
    { name: "Order History", link: "/profile/orders" },
  ];

  useEffect(() => {
    if (!activeLink) setActiveLink(window.location.pathname);
  }, [activeLink]);

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

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Burger Button */}
      <button
      className="flex items-center justify-center"
        type="button"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* eslint-disable-next-line */}
        <img
          src={user?.imageUrl || "/default-avatar.png"} // Added a fallback image
          alt="profile-picture"
          className="rounded-full md:w-10 md:h-10 w-8 h-8 mr-2 object-cover border-2 border-gray-400 hover:border-blue-500 transition-all"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-36 h-32 py-3 z-50 rounded-md shadow-lg bg-white ring-1 ring-blue-500 ring-opacity-5 focus:outline-none transition ease-out duration-100 ${
          isOpen
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="burger-button"
      >
        <ul className="flex flex-col items-center gap-3">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  onClick={() => {
                    setActiveLink(link.link);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-colors duration-200 ${
                    activeLink === link.link
                      ? "bg-blue-600 text-white"
                      : "hover:bg-neutral-700 hover:text-white"
                  }`}
                  aria-current={activeLink === link.link ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => logout()}
              className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-neutral-700 hover:text-white"
            >
              <p>Log out</p> <LogOut className="w-4 h-4" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
