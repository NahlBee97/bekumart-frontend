"use client";

import toast from "react-hot-toast";
import api from "@/lib/axios";
import { ProductSchema } from "@/schemas/productSchemas";
import { useFormik } from "formik";

import { TextInputField } from "@/components/formFields/textInputField";
import { SelectField } from "@/components/formFields/selectField";
import { NumberInputField } from "@/components/formFields/numberInputField";
import { AreaInputField } from "@/components/formFields/areaInputField";
import { TinyCommonButton } from "@/components/buttons/tinyCommonButton";
import { SubmitButton } from "@/components/buttons/submitButton";
import { ICategory, IProduct } from "@/interfaces/dataInterfaces";

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
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-500">
              {productToEdit?.id ? "Edit Product Details" : "Add New Product"}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <SelectField
                formik={formik}
                items={categories}
                fieldName="category"
                label="Category"
                onItemChange={handleCategoryChange}
              />
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
          <div className="p-6 bg-gray-50 flex justify-end items-center gap-4 rounded-b-xl">
            <TinyCommonButton
              isPositive={false}
              onClick={onClose}
              buttonText="Batal"
            />
            <SubmitButton formik={formik} buttonText="Simpan" />
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
