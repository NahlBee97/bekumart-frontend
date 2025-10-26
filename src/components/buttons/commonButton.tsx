interface props {
  onClick: () => void;
  isDisable: boolean;
  buttonText: string;
}

export const CommonButton = ({ onClick, isDisable, buttonText }: props) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={isDisable}
    >
      {buttonText}
    </button>
  );
};
