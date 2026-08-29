interface props {
  onClickPrev: () => void;
  onClickNext: () => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({
  onClickPrev,
  onClickNext,
  currentPage,
  totalPages,
}: props) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={onClickPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-ink/70 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-frost-light hover:text-frost-deep active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 transition-all cursor-pointer"
      >
        Kembali
      </button>
      <span className="text-sm font-mono text-fog">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onClickNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-ink/70 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-frost-light hover:text-frost-deep active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 transition-all cursor-pointer"
      >
        Lanjut
      </button>
    </div>
  );
};
