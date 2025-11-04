"use client";

import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { usePathname, useRouter } from "next/navigation";

import AdminNavbar from "../navbar/adminNavbar";
import ClientNavbar from "../navbar/clientNavbar";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, checkAuth, isAuthLoading } = useAuthStore();
  const { checkCart } = useCartStore();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const response = await api.get("/api/auth/check");
      setIsLoggedIn(response.data.status.isLoggedIn);
    };
    checkIsLoggedIn();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) checkAuth();
  }, [isLoggedIn, checkAuth]);

  useEffect(() => {
    if (!user.id && user.role !== "CUSTOMER") return;
    checkCart(user.id);
  }, [user.id, user.role, checkCart]);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const isPathAdmin = pathname.startsWith("/admin");
    const isPathAuth = pathname === "/login" || pathname === "/register";

    const isPathGeneral = !isPathAdmin && !isPathAuth;

    if (user) {
      if (user.role === "ADMIN") {
        if (isPathAdmin) {
          return;
        }

        if (isPathGeneral || isPathAuth) {
          router.push("/admin");
          return;
        }
      }
    }
    
    return;
  }, [user, isAuthLoading, pathname, router]);

  return (
    <>
      {/* ✅ Tampilkan Navbar jika admin */}
      {user.role !== "ADMIN" ? <ClientNavbar /> : <AdminNavbar />}

      {/* ✅ Tampilkan konten utama */}
      {children}
    </>
  );
}
