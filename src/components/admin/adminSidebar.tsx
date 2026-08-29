"use client";

import Link from "next/link";
import { FileText, LogOut, Package, User, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AdminSidebar() {
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", link: "/admin" },
    { icon: FileText, label: "Product Management", link: "/admin/products" },
    { icon: Package, label: "Order Management", link: "/admin/orders" },
    { icon: User, label: "Profile", link: "/admin/profile" },
  ];

  const isProtectedPage = pathname.startsWith("/admin");

  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      if (isProtectedPage) router.push("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed: " + error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-white p-4 rounded-2xl shadow-sm shadow-ink/5">
      <h2 className="font-display text-sm uppercase tracking-wider text-fog font-semibold mb-4">Navigasi</h2>
      <nav>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;
            return (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className={`flex items-center py-3 px-3 my-1 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-frost text-white font-semibold shadow-sm shadow-frost/30"
                        : "text-ink/70 hover:bg-frost-light/60 hover:text-frost-deep"
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
          className="flex w-full gap-2 items-center p-3 my-1 rounded-xl transition-all duration-200 text-ink/70 hover:bg-red-50 hover:text-red-600 hover:font-semibold"
          onClick={handleLogOut}
        >
          <LogOut className="w-5 h-5" />
          <span>{isLoggingOut ? "Memproses..." : "Keluar"}</span>
        </button>
      </nav>
    </aside>
  );
}
