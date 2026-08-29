"use client";

import { PlusIcon, Search } from "lucide-react";

interface props {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onAddProductClick: () => void;
}

export const ProductsTableHeader = ({
  searchTerm,
  onSearchTermChange,
  onAddProductClick,
}: props) => {
  return (
    <div className="flex items-center p-4 sm:p-6 border-b border-slate-100 gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari berdasarkan nama produk atau kategori..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full pl-10 pr-2 md:pr-4 py-1.5 md:py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-frost transition-shadow"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-fog w-4 h-4"/>
        </div>
      </div>
      <button
        onClick={onAddProductClick}
        className="flex-shrink-0 flex items-center gap-2 bg-frost text-white font-semibold px-3 py-1.5 md:py-2 md:px-4 rounded-full shadow-sm hover:bg-frost-deep hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 transition-all"
      >
        <PlusIcon className="w-4 h-4" />
        Tambah
      </button>
    </div>
  );
};
