"use client";

import { IOrderItem } from "@/interfaces/dataInterfaces";
import api from "@/lib/axios";
import useAuthStore from "@/stores/useAuthStore";
import { useFormik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RatingModal = ({
  isOpen,
  onSave,
  onClose,
  item,
}: {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
  item: IOrderItem;
}) => {
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      review: "",
      rating: 0,
    },
    onSubmit: async (values) => {
      try {
        await api.post(`/api/reviews/${item.productId}`, {
          review: values.review,
          rating: values.rating,
          userId: user.id,
        });

        toast.success("Berhasil Review!");
        onSave();
        onClose();
      } catch (error) {
        console.error("Gagal menyimpan rating:", error);
        toast.error("Gagal menyimpan rating. Silakan coba lagi.");
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
      formik.resetForm();
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h3 className="text-lg font-semibold text-blue-500">
            Kasih Rating Product Ini
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-2 px-4 overflow-y-auto bg-slate-50">
          <div className="flex flex-col items-center gap-2 mb-2">
            <h2 className="text-gray-800 font-semibold">{item.product.name}</h2>
            {/* eslint-disable-next-line */}
            <img
              src={item.product.productPhotos[0].imageUrl}
              alt={item.product.name}
              className="w-40 h-40 aspect-square rounded-lg border border-gray-500 shadow-md"
            />
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700"
              >
                Pendapatmu Mengenai Produk Ini:
              </label>
              <textarea
                id="review"
                rows={5}
                {...formik.getFieldProps("review")}
                className="mt-1 block w-full bg-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.review && formik.errors.review && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.review}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <input
                id="rating"
                type="number"
                max={5}
                {...formik.getFieldProps("rating")}
                className="mt-1 block w-full bg-white px-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.rating && formik.errors.rating && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.rating}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-40 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {formik.isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Simpan Rating"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
