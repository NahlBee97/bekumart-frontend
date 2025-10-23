"use client";

import { FileText, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: User, label: "Profile", link: "/profile" },
    { icon: FileText, label: "Riwayat Pesanan", link: "/profile/orders" },
  ];

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
                  className={`flex items-center p-3 my-1 rounded-lg transition-colors
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
      </nav>
    </aside>
  );
}
