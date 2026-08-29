"use client";

interface props {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: props) => {
  return (
    <div className="p-4 sm:p-6 flex items-center justify-between border-t border-slate-100">
      <span className="text-sm text-fog font-mono">
        {currentPage} / {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xs md:text-sm font-medium text-ink/70 bg-white border border-slate-200 rounded-full hover:bg-frost-light hover:text-frost-deep active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
        >
          Kembali
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-xs md:text-sm font-medium text-ink/70 bg-white border border-slate-200 rounded-full hover:bg-frost-light hover:text-frost-deep active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
