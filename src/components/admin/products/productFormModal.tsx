"use client";

import { ICategory, IProduct } from "@/interfaces/productInterfaces";
import api from "@/lib/axios";
import { getCategories } from "@/lib/data";
import { ProductSchema } from "@/schemas/productSchemas";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

// --- PRODUCT FORM MODAL COMPONENT ---
interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  productToEdit: IProduct | null;
}

const ProductFormModal: FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories);
      };
      fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: productToEdit || {
      name: "",
      category: { id: "", name: "" },
      price: 0,
      stock: 0,
      description: "",
      weightInKg: 0,
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {
        // Create a new payload object for the API
        const payload = {
          ...values,
          categoryId: values.category?.id, // Extract the category ID
        };

        if (productToEdit?.id) {
          // Update existing product
          await api.put(`/api/products/${productToEdit.id}`, payload);
        } else {
          await api.post(`/api/products`, payload);
        }
        onSave();
        toast.success("Berhasil Menyimpan Product");
      } catch (error) {
        console.error("Gagal Menyimpan Product:", error);
        toast.error("Gagal Menyimpan Product");
      }
    },
  });

  if (!isOpen) return null;

  const modalTitle = productToEdit?.id
    ? "Edit Product Details"
    : "Add New Product";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-500">{modalTitle}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                required
                className="form-input"
              />
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formik.values.category?.id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const category = categories.find((c) => c.id === selectedId);
                  console.log("Selected category:", category);
                  formik.setFieldValue(
                    "category",
                    category || { id: "", name: "" }
                  );
                }}
                required
                className="form-input"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formik.values.price || ""}
                onChange={formik.handleChange}
                required
                min="0"
                step="0.01"
                className="form-input"
              />
            </div>
            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formik.values.stock || ""}
                onChange={formik.handleChange}
                required
                min="0"
                className="form-input"
              />
            </div>
            {/* Weight */}
            <div className="md:col-span-2">
              <label
                htmlFor="weightInKg"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                name="weightInKg"
                id="weightInKg"
                value={formik.values.weightInKg || ""}
                onChange={formik.handleChange}
                min="0"
                step="0.01"
                className="form-input"
              />
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formik.values.description || ""}
                onChange={formik.handleChange}
                rows={4}
                className="form-input"
              ></textarea>
            </div>
          </div>
          <div className="p-6 bg-gray-50 flex justify-end items-center gap-4 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              {formik.isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
      <style>{`
                .form-input { display: block; width: 100%; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #1f2937; background-color: #fff; border: 1px solid #d1d5db; border-radius: 0.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
                .form-input:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
            `}</style>
    </div>
  );
};

export default ProductFormModal;
