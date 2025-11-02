import { Filter } from "lucide-react";

export const NoProduct = ({onFilterClick}: {onFilterClick: () => void}) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center text-center">
      <Filter
        className="md:hidden border border-gray-300 text-gray-400 p-1 rounded-xs shadow-xs hover:bg-slate-50 cursor-pointer"
        onClick={onFilterClick}
      />
      <h2 className="text-base font-semibold text-blue-500 mb-4 uppercase tracking-wider">
        Produk Tidak Tersedia
      </h2>

      <h2 className="text-base font-semibold text-slate-600 mb-4 tracking-wider">
        Silahkan cari produk lainnya
      </h2>
    </div>
  );
}
