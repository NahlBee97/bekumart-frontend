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
      className={`rounded-md px-4 py-1 text-sm text-white  ${
        isPositive
          ? "hover:bg-blue-600 bg-blue-500"
          : "bg-red-500 hover:bg-red-600"
      } `}
    >
      {buttonText}
    </button>
  );
};
