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
    <div className="flex items-center p-4 sm:p-6 border-b border-gray-200 gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari berdasarkan nama produk atau kategori..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full pl-10 pr-2 md:pr-4 py-1 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-500"/>
        </div>
      </div>
      <button
        onClick={onAddProductClick}
        className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white font-semibold px-2 py-1 md:py-2 md:px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
      >
        <PlusIcon />
        Tambah
      </button>
    </div>
  );
};
