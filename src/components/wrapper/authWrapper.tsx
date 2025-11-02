"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import AdminNavbar from "../navbar/adminNavbar";
import ClientNavbar from "../navbar/clientNavbar";
import api from "@/lib/axios";
import { useCartStore } from "@/stores/useCartStore";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, checkAuth } = useAuthStore();
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

  return (
    <>
      {/* ✅ Tampilkan Navbar jika admin */}
      {user.role !== "ADMIN" ? <ClientNavbar /> : <AdminNavbar />}

      {/* ✅ Tampilkan konten utama */}
      {children}
    </>
  );
}
