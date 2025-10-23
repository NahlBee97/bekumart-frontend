"use client";

import { PlusIcon } from "./icons";

interface ProductsTableHeaderProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onAddProductClick: () => void;
}

export default function ProductsTableHeader({
  searchTerm,
  onSearchTermChange,
  onAddProductClick,
}: ProductsTableHeaderProps) {
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
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
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
}
