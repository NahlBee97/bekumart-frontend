interface props {
  isDisable: boolean;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector = ({
  isDisable,
  quantity,
  onIncrease,
  onDecrease,
}: props) => {
  return (
    <div className="w-35 flex items-center border border-slate-200 rounded-full">
      <button
        onClick={onDecrease}
        disabled={isDisable}
        className="px-4 py-2 text-ink/70 hover:bg-frost-light hover:text-frost-deep rounded-l-full transition-colors duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Decrement quantity"
      >
        -
      </button>
      <span className="px-4 py-2 text-center w-16 bg-white font-mono font-medium text-ink">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="px-4 py-2 text-ink/70 hover:bg-frost-light hover:text-frost-deep rounded-r-full transition-colors duration-200 focus:outline-none"
        aria-label="Increment quantity"
      >
        +
      </button>
    </div>
  );
};
