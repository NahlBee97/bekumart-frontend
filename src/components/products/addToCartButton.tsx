import { ShoppingCartIcon } from "lucide-react";

interface props {
  onAdd: () => void;
  isLoading: boolean;
  name: string;
}

export const AddToCartButton = ({ onAdd, isLoading, name }: props) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 w-full md:w-60 ${
        isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
      } text-white rounded py-2 px-3 md:py-3 md:px-6  transition disabled:cursor-not-allowed`}
      onClick={onAdd}
      disabled={isLoading}
    >
      {!isLoading ? (
        <>
          <ShoppingCartIcon /> {name}
        </>
      ) : (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      )}
    </button>
  );
};
