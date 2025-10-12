import useAuthStore from "@/stores/useAuthStore";
import { LogOut, Snowflake } from "lucide-react";
import Link from "next/link";
import { BurgerMenu } from "./burgerMenu";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNavbar() {
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  const links = [
    { name: "Profile", link: "/admin" },
    { name: "Order Management", link: "/admin/orders" },
    { name: "Product Management", link: "/admin/products" },
  ];

  const handleLogOut = () => {
    const forbiddenPrefixes = ["/cart", "/checkout", "/profile"];

    const isForbidden = forbiddenPrefixes.some((prefix) =>
      pathname.startsWith(prefix)
    );

    logout();

    if (isForbidden) {
      router.push("/");
    } else {
      router.push(pathname);
    }
  };

  return (
    <div className="w-full">
      <div
        className="
        w-full
        flex md:flex-row
        items-center
        justify-between
        gap-1 sm:gap-6
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[150px] 2xl:px-[300px]
        py-4 sm:py-5 md:py-6
        border-b border-neutral-100
      "
      >
        <div className="flex items-center gap-2 md:w-auto">
          <Snowflake className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 text-blue-400" />
          <p className="font-semibold text-base sm:text-2xl xl:text-3xl text-blue-500">
            BekuMart Dashboard
          </p>
        </div>

        <div className="flex items-center justify-end md:justify-end md:gap-4 gap-1 md:w-auto md:mt-0">
          <div className="flex items-center">
            <Link href="/admin">
              {/* eslint-disable-next-line */}
              <img
                src={user?.imageUrl} // Added a fallback image
                alt="profile-picture"
                className="rounded-full md:w-10 md:h-10 w-8 h-8 object-cover border-2 border-gray-400 hover:border-blue-500 transition-all"
              />
            </Link>
          </div>
          <div className="md:hidden">
            <BurgerMenu links={links} />
          </div>
          <button
            onClick={handleLogOut}
            className="font-medium transition-colors duration-200 hover:text-red-500"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
