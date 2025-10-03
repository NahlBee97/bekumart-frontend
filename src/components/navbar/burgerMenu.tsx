import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import type { FC } from "react";

// You can move this component to its own file and import it
export const BurgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeLink, setActiveLink] = useState("");
  const links = [
    { name: "Home", link: "/" },
    { name: "Tentang Kami", link: "/about" },
    { name: "Hubungi Kami", link: "/contact" },
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
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex justify-center items-center w-full rounded-lg px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

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
        </ul>
      </div>
    </div>
  );
};
