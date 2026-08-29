"use client";

import { IProduct } from "../../../interfaces/dataInterfaces";
import { formatCurrency } from "@/helper/functions";
import { Camera, Edit3, Trash2 } from "lucide-react";

interface props {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onOpenImageModal: (product: IProduct) => void;
}

export const ProductsTableRow = ({
  product,
  onEdit,
  onDelete,
  onOpenImageModal,
}: props) => {
  const defaultImage =
    product.productPhotos.find((photo) => photo.isDefault === true)?.imageUrl ||
    "https://placehold.co/40x40/e2e8f0/64748b?text=N/A";

  return (
    <tr className="bg-white border-b border-slate-100 hover:bg-mist/60 transition-colors">
      <td className="px-3 py-2 font-medium text-ink whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="relative group flex-shrink-0">
            {/* eslint-disable-next-line */}
            <img
              src={defaultImage}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover bg-mist"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/40x40/e2e8f0/64748b?text=Error";
              }}
            />
            <button
              onClick={() => onOpenImageModal(product)}
              className="absolute inset-0 bg-ink/60 flex items-center justify-center text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Change image"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div>
            <div className="font-semibold text-ink">{product.name}</div>
            <div className="text-xs text-fog">
              Rating:{" "}
              {product.rating ? `${product.rating}/5` : "Belum ada rating"}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="px-2.5 py-1 text-xs font-medium leading-5 text-frost-deep bg-frost-light rounded-full">
          {product.category.name}
        </span>
      </td>
      <td className="px-3 py-2 text-right font-mono text-ink">{formatCurrency(product.price)}</td>
      <td className="px-3 py-2 text-center text-ink">{product.stock}</td>
      <td className="px-3 py-2 text-center text-ink">{product.weightInKg}</td>
      <td className="px-3 py-2">
        <div className="flex items-center justify-center space-x-1">
          <button
            className="p-1.5 rounded-full text-fog hover:text-frost-deep hover:bg-frost-light/60 transition-colors"
            onClick={() => onEdit(product)}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-1.5 rounded-full text-fog hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
