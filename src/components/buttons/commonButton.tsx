interface props {
  onClick: () => void;
  isDisable: boolean;
  buttonText: string;
}

export const CommonButton = ({ onClick, isDisable, buttonText }: props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisable}
      className="w-full bg-frost text-white font-semibold py-2.5 px-4 rounded-full mt-2 shadow-sm hover:bg-frost-deep hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-frost focus-visible:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
    >
      {buttonText}
    </button>
  );
};
