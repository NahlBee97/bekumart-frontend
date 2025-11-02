import { Filter } from "lucide-react";
import { useState } from "react";
import { FilterModal } from "../shop/filterModal";

export const NoProduct = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center">
      <Filter
        className="md:hidden w-10 h-10 border border-gray-300 text-gray-400 p-1 mb-4 rounded-xs shadow-xs hover:bg-slate-50 cursor-pointer"
        onClick={() => setIsFilterOpen(true)}
      />
      <h2 className="text-base font-semibold text-blue-500 mb-4 uppercase tracking-wider">
        Produk Tidak Tersedia
      </h2>

      <h2 className="text-base font-semibold text-slate-600 mb-4 tracking-wider">
        Silahkan cari produk lainnya
      </h2>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};
