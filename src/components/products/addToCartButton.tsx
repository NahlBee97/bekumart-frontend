import { ShoppingCartIcon } from "lucide-react";

interface props {
  onAdd: () => void;
  isLoading: boolean;
  name: string;
}

export const AddToCartButton = ({ onAdd, isLoading, name }: props) => {
  return (
    <button
      className="flex justify-center items-center gap-2 w-36 md:w-60 bg-blue-500 text-white rounded py-2 px-3 md:py-3 md:px-6 hover:bg-blue-600 transition"
      onClick={onAdd}
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
