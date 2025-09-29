import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const links = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <div
      className="
      w-full
      bg-neutral-800
      text-neutral-400
      flex flex-col md:flex-row
      items-center
      justify-between
      px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[150px] 2xl:px-[300px]
      py-3 md:py-4
      gap-3 md:gap-0
    "
    >
      {/* Navigation Links */}
      <ul
        className="
        flex
        flex-wrap justify-center md:justify-start
        gap-x-5 sm:gap-x-6
        gap-y-2
        w-full md:w-auto
        text-sm sm:text-[14px]
        
      "
      >
        {links.map((link, index) => {
          const isActive = pathname === link.link;
          return (
            <li key={index}>
              <Link
                href={link.link}
                className={`
                  transition-colors
                  p-2
                  rounded
                  ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:text-white hover:font-semibold hover:bg-gray-600"
                  }
                `}
                aria-label={link.name}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
