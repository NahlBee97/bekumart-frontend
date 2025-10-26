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
        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Kembali
      </button>
      <span className="text-sm text-slate-700 dark:text-slate-400">
        Hal {currentPage} dari {totalPages}
      </span>
      <button
        onClick={onClickNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Lanjut
      </button>
    </div>
  );
};
