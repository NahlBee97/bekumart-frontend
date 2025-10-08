"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavLinks() {
  
  const [activeLink, setActiveLink] = useState("");
  const links = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  useEffect(() => {
    if (!activeLink) setActiveLink(window.location.pathname);
  }, [activeLink]);

  return (
    <nav className="w-full h-1 md:h-10 md:flex md:items-center md:gap-5 bg-neutral-800 text-neutral-400 shadow-lg top-0 z-50">
      {/* Desktop Navigation Links */}
      <div className="hidden md:block">
        <ul className="flex items-baseline space-x-4">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  href={link.link}
                  onClick={() => setActiveLink(link.link)}
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
    </nav>
  );
}
