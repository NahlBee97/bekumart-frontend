"use client";

import { usePathname } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import AdminNavbar from "./navbar/adminNavbar";
import ClientNavbar from "./navbar/clientNavbar";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token") as string;
  const pathname = usePathname();

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    if (token) checkAuth();
  }, [token, checkAuth]);

  // ❗️Mendeteksi halaman admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Tampilkan Navbar jika BUKAN halaman admin */}
      {!isAdminRoute ? <ClientNavbar /> : <AdminNavbar/>}

      {/* ✅ Tampilkan konten utama */}
      {children}
    </>
  );
}
