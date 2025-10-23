import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// You can move this component to its own file and import it
export const BurgerMenu = ({
  links,
}: {
  links: { name: string; link: string }[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Using Next.js's usePathname is more reliable for client-side navigation
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
          className="inline-flex justify-center items-center rounded-lg p-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-40 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  focus:outline-none transition ease-out duration-100 z-200 ${
          isOpen
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="burger-button"
      >
        <div className="py-1" role="none">
          {links.map((link) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
