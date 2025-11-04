"use client";

import Link from "next/link";
import { FileText, LogOut, Package, User, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

export default function AdminSidebar() {
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", link: "/admin" },
    { icon: FileText, label: "Product Management", link: "/admin/products" },
    { icon: Package, label: "Order Management", link: "/admin/orders" },
    { icon: User, label: "Profile", link: "/admin/profile" },
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
    <aside className="w-full lg:w-64 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg text-blue-500 font-bold mb-4">Navigation</h2>
      <nav>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;
            return (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className={`flex items-center py-3 px-2 my-1 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-600 hover:text-white hover:font-semibold"
                    }
                  `}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="flex w-full gap-2 items-center p-3 my-1 rounded-lg transition-colors hover:bg-red-500 hover:text-white hover:font-semibold"
          onClick={handleLogOut}
        >
          <LogOut />
          <span>Keluar</span>
        </button>
      </nav>
    </aside>
  );
}
