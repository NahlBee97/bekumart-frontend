"use client";

interface ProductsTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: ProductsTablePaginationProps) {
  return (
    <div className="p-4 sm:p-6 flex items-center justify-between border-t border-gray-200">
      <span className="text-sm text-gray-600">
        Hal <span className="font-semibold">{currentPage}</span> dari{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
