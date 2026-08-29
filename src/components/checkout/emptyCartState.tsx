import { ShoppingCart } from "lucide-react";
import { CommonButton } from "../buttons/commonButton";
import { useRouter } from "next/navigation";

export const EmptyCartState = () => {
  const router = useRouter();
  return (
    <div className="bg-mist min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <div className="animate-fade-up flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-frost-light rounded-full blur-xl opacity-70"></div>
          <ShoppingCart className="relative w-20 h-20 text-frost" strokeWidth={1.25} />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">
          Halaman Checkout Kosong
        </h1>
        <p className="text-fog mb-6">
          Sepertinya kamu belum menambahkan sesuatu, mari belanja!
        </p>
        <div className="w-48">
          <CommonButton
            onClick={() => router.push("/shop")}
            isDisable={false}
            buttonText="Lanjut Belanja"
          />
        </div>
      </div>
    </div>
  );
};
