"use client";

import toast from "react-hot-toast";
import { ICartItem } from "@/interfaces/dataInterfaces";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { QuantitySelector } from "../products/quantitySelector";
import { ConfirmModal } from "../confirmModal";
import { LoadingModal } from "../loadingModal";

export const CartItemCard = ({ item }: { item: ICartItem }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { updateItemQuantity, deleteItem } = useCartStore();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Sync local state with prop when item quantity changes
  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  // Debounced update effect
  useEffect(() => {
    if (localQuantity === item.quantity) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setIsLoading(true);
        await updateItemQuantity(user?.id as string, item.id, localQuantity);
        setIsLoading(false);
        toast.success("Berhasil merubah jumlah");
      } catch (error) {
        // Revert to item quantity on error
        setLocalQuantity(item.quantity);
        toast.error("Gagal merubah jumlah");
        console.error("Failed to update quantity:", error);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuantity, item.quantity, user, item.id, updateItemQuantity]);

  const handleDecrement = () => {
    setLocalQuantity((prev) => Math.max(1, prev - 1)); // Prevents quantity from going below 1
  };

  const handleIncrement = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteItem(user?.id as string, item.id);
      toast.success("Berhasil Menghapus");
    } catch (error) {
      console.error("Gagal Menghapus: " + error);
      toast.error("Gagal Menghapus");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex w-full gap-4 bg-white rounded-2xl p-3 shadow-sm shadow-ink/5 hover:shadow-md transition-shadow duration-300">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line */}
        <img
          src={
            item.product?.productPhotos?.find(
              (photo) => photo.isDefault === true
            )?.imageUrl
          }
          alt="product image"
          className="w-24 h-24 rounded-xl object-cover sm:w-32 sm:h-32 bg-mist"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row justify-between">
        <div className="relative ">
          <h3
            className="text-base font-medium line-clamp-2 text-ink cursor-pointer hover:text-frost-deep transition-colors"
            onClick={() => router.push(`/products/${item.product?.id}`)}
          >
            {item.product?.name}
          </h3>
          <p className="text-sm text-fog"
          >
            Berat: {item.product?.weightInKg} Kg
          </p>
          <p className="font-mono font-semibold text-berry">
            Rp {item.product?.price.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex items-start justify-between text-sm">
          <div className="block md:flex gap-2 items-center mt-2 sm:mt-0">
            {isLoading ? (
              <div className="h-9 w-35 animate-pulse rounded-full bg-slate-200"></div>
            ) : (
              <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
                {localQuantity === 1 && (
                  <button
                    type="button"
                    onClick={() => setIsConfirmModalOpen(true) }
                    className="p-2 font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    disabled={item.quantity > 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <QuantitySelector
                  isDisable={localQuantity <= 1}
                  quantity={localQuantity}
                  onDecrease={handleDecrement}
                  onIncrease={handleIncrement}
                />
              </div>
            )}
            <p className="text-fog text-xs mt-1 md:mt-0">Tersisa: {item.product.stock}</p>
          </div>
        </div>
      </div>
      <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title={`Hapus ${item.product.name}?`} confirmText="Hapus" onConfirm={handleDelete} />
        <LoadingModal isOpen={isDeleting} title={`Menghapus ${item.product.name}`}/>
    </div>
  );
};
