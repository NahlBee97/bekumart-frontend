"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  return (
    <div
      className="relative rounded-2xl md:rounded-3xl overflow-hidden md:min-h-[480px] flex items-end p-4 md:p-10 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(14,27,34,0.15) 0%, rgba(14,27,34,0.65) 100%), url("./frozen-banner.jpg")`,
      }}
    >
      {/* Signature frosted-glass panel: the "looking through the freezer
          door" moment that carries the brand's visual identity. */}
      <div className="frost-glass relative max-w-xl text-white rounded-2xl p-5 md:p-8 animate-fade-up">
        <span className="inline-block text-xs font-mono tracking-wider uppercase text-frost-light/90 mb-3">
          -18°C · Segar terjaga
        </span>
        <h1 className="font-display text-2xl md:text-5xl font-semibold tracking-tight mb-4 leading-tight">
          Frozen Store Terbaik di Sila
        </h1>
        <p className="text-sm md:text-lg mb-6 text-white/85">
          Temukan beragam pilihan makanan beku kami, dari sajian istimewa
          hingga hidangan penutup yang segar. Nikmati praktisnya
          bahan-bahan berkualitas yang kami kirim sampai ke rumah Anda.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-berry text-sm md:text-base text-white font-semibold rounded-full shadow-lg shadow-berry/30 hover:bg-berry-deep hover:shadow-xl hover:shadow-berry/40 active:scale-95 transition-all duration-200"
        >
          Belanja Sekarang
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
