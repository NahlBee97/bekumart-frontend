import { ShoppingCart } from "lucide-react";
import { CommonButton } from "../buttons/commonButton";
import { useRouter } from "next/navigation";

export const CartEmptyState = () => {
  const router = useRouter();
  return (
    <div className="bg-white min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" strokeWidth={1} />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Keranjang Belanja Kosong
      </h1>
      <p className="text-gray-500 mb-6">
        Sepertinya kamu belum menambahkan sesuatu, mari belanja!
      </p>
      <div className="w-40">
        <CommonButton
          onClick={() => router.push("/shop")}
          isDisable={false}
          buttonText="Lanjut Belanja"
        />
      </div>
    </div>
  );
};
