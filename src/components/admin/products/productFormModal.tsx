"use client";

import toast from "react-hot-toast";
import api from "@/lib/axios";
import { ProductSchema } from "@/schemas/productSchemas";
import { useFormik } from "formik";

import { TextInputField } from "@/components/formFields/textInputField";
import { NumberInputField } from "@/components/formFields/numberInputField";
import { AreaInputField } from "@/components/formFields/areaInputField";
import { TinyCommonButton } from "@/components/buttons/tinyCommonButton";
import { SubmitButton } from "@/components/buttons/submitButton";
import { ICategory, IProduct } from "@/interfaces/dataInterfaces";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

// --- PRODUCT FORM MODAL COMPONENT ---
interface props {
  categories: ICategory[];
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  productToEdit: IProduct | null;
}

export const ProductFormModal = ({
  categories,
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
      if (isOpen) {
        // Use a tiny timeout to allow the component to mount before starting the transition
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
      } else {
        setShow(false);
      }
    }, [isOpen]);

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

  const handleCategoryChange = (selectedName: string) => {
    const category = categories.find((c) => c.name === selectedName);
    formik.setFieldValue("category", category || { id: "", name: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl text-blue-500 font-semibold">
            {productToEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <TextInputField
                  formik={formik}
                  type="text"
                  fieldName="name"
                  label="Product Name"
                  withLabel={true}
                  placeHolder=""
                />
              </div>
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:ring-blue-500 "
                  value={formik.values.category?.name || ""}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.category.name}
                  </div>
                ) : null}
              </div>
              {/* Price */}
              <div>
                <NumberInputField
                  formik={formik}
                  fieldName="price"
                  label="Harga"
                  withLabel={true}
                  min={0}
                  placeHolder=""
                />
              </div>
              {/* Stock */}
              <div>
                <NumberInputField
                  formik={formik}
                  fieldName="stock"
                  label="Stok"
                  withLabel={true}
                  min={0}
                  placeHolder=""
                />
              </div>
              {/* Weight */}
              <div className="md:col-span-2">
                <NumberInputField
                  formik={formik}
                  fieldName="weightInKg"
                  label="Berat (Kg)"
                  withLabel={true}
                  min={0}
                  placeHolder=""
                />
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <AreaInputField
                  formik={formik}
                  fieldName="description"
                  label="Deskrpsi"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <TinyCommonButton
                onClick={() => onClose()}
                buttonText="Batal"
                isPositive={false}
              />
              <SubmitButton formik={formik} buttonText="Simpan" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
