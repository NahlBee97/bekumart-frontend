"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export function UserRouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthLoading } = useAuthStore();

  useEffect(() => {
    if (user?.role !== "CUSTOMER" && !isAuthLoading) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [router, user, isAuthLoading, pathname]);

  if (isAuthLoading) {
    return <Loading />;
  }

  return user?.role === "CUSTOMER" ? <>{children}</> : <div className="min-h-screen"></div>;
}
