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
    <div className="w-35 flex items-center border border-gray-300 rounded-md">
      <button
        onClick={onDecrease}
        disabled={isDisable}
        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition duration-200 focus:outline-none"
        aria-label="Decrement quantity"
      >
        -
      </button>
      <span className="px-4 py-2 text-center w-16 bg-white font-medium">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition duration-200 focus:outline-none"
        aria-label="Increment quantity"
      >
        +
      </button>
    </div>
  );
};
