import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Snowflake } from "lucide-react";

import { BurgerMenu } from "./burgerMenu";
import toast from "react-hot-toast";

export default function AdminNavbar() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", link: "/admin" },
    { name: "Order Management", link: "/admin/orders" },
    { name: "Product Management", link: "/admin/products" },
    { name: "Profile", link: "/admin/profile" },
  ];

  const protectedPages = ["/admin", "/profile", "/cart", "/checkout"];
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page)
  );

  const handleLogOut = async () => {
    try {
      await logout();
      if (isProtectedPage) router.push("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed: " + error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 ">
      <div className="container mx-auto px-3 md:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-2 md:w-auto">
            <Snowflake className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            <p className="font-semibold text-base md:text-2xl text-blue-500">
              BekuMart Dashboard
            </p>
          </div>
          {/* right section */}
          <div className="flex items-center justify-end md:justify-end md:gap-4 gap-1 md:w-auto md:mt-0">
            <div className="md:hidden">
              <BurgerMenu links={links} />
            </div>
            <button
              onClick={handleLogOut}
              className="md:hidden font-medium transition-colors duration-200 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
