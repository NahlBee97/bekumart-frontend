"use client";

import { CameraIcon, DeleteIcon, EditIcon } from "./icons";
import { IProduct } from "../../../interfaces/dataInterfaces";

interface ProductsTableRowProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  onOpenImageModal: (product: IProduct) => void;
}

export default function ProductsTableRow({
  product,
  onEdit,
  onDelete,
  onOpenImageModal,
}: ProductsTableRowProps) {
  const defaultImage =
    product.productPhotos.find((photo) => photo.isDefault === true)?.imageUrl ||
    "https://placehold.co/40x40/e2e8f0/64748b?text=N/A";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="relative group flex-shrink-0">
            {/* eslint-disable-next-line */}
            <img
              src={defaultImage}
              alt={product.name}
              className="w-12 h-12 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/40x40/e2e8f0/64748b?text=Error";
              }}
            />
            <button
              onClick={() => onOpenImageModal(product)}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-md opacity-0 group-hover:opacity-50 transition-opacity"
              aria-label="Change image"
            >
              <CameraIcon />
            </button>
          </div>
          <div>
            <div className="font-bold">{product.name}</div>
            <div className="text-xs text-gray-500">
              Rating:{" "}
              {product.rating ? `${product.rating}/5` : "Belum ada rating"}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-2">
        <span className="px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {product.category.name}
        </span>
      </td>
      <td className="px-3 py-2 text-right">{formatCurrency(product.price)}</td>
      <td className="px-3 py-2 text-center">{product.stock}</td>
      <td className="px-3 py-2 text-center">{product.weightInKg}</td>
      <td className="px-3 py-2">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => onEdit(product)}
            className="group p-1 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Edit product"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="group p-1 rounded-full hover:bg-red-100 transition-colors"
            aria-label="Delete product"
          >
            <DeleteIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}
