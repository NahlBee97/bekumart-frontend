interface props {
  buttonText: string;
  onClick: () => void;
  isPositive: boolean;
}

export const TinyCommonButton = ({
  buttonText,
  onClick,
  isPositive,
}: props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium text-white shadow-sm active:scale-95 transition-all duration-200 ${
        isPositive
          ? "bg-frost hover:bg-frost-deep hover:shadow-md"
          : "bg-red-500 hover:bg-red-600 hover:shadow-md"
      }`}
    >
      {buttonText}
    </button>
  );
};
