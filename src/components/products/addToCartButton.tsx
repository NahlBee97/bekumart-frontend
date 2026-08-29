import { ShoppingCartIcon } from "lucide-react";

interface props {
  onAdd: () => void;
  isLoading: boolean;
  name: string;
}

export const AddToCartButton = ({ onAdd, isLoading, name }: props) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 w-full md:w-60 font-semibold ${
        isLoading ? "bg-gray-300" : "bg-berry hover:bg-berry-deep hover:shadow-md hover:shadow-berry/30"
      } text-white rounded-full py-2 px-3 md:py-3 md:px-6 active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:active:scale-100`}
      onClick={onAdd}
      disabled={isLoading}
    >
      {!isLoading ? (
        <>
          <ShoppingCartIcon className="w-5 h-5" /> {name}
        </>
      ) : (
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/40 border-t-white"></div>
      )}
    </button>
  );
};
