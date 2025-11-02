"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthLoading } = useAuthStore();

  useEffect(() => {
    if (user?.role !== "ADMIN" && !isAuthLoading) {
      router.push("/login");
    }
  }, [router, user, isAuthLoading]);

  if (isAuthLoading) {
    return <Loading />;
  }

  return user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <div className="min-h-screen"></div>
  );
}
