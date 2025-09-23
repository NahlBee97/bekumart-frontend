"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ❗️Mendeteksi halaman admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Tampilkan Navbar jika BUKAN halaman admin */}
      {!isAdminRoute && <Navbar />}

      {/* ✅ Tampilkan konten utama */}
      {children}

      {/* ✅ Tampilkan Footer jika BUKAN halaman admin */}
      {!isAdminRoute && (
        <div className="2xl:px-[300px] xl:px-[150px] bg-[#1A1A1A]">
          <Footer />
        </div>
      )}
    </>
  );
}
