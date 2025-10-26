import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { Trash2, X } from "lucide-react";

import { StarIcon } from "@/components/icons";
import { RatingSchema } from "@/schemas/ratingSchema";
import { AreaInputField } from "@/components/formFields/areaInputField";
import { SubmitButton } from "@/components/buttons/submitButton";

const maxPhotos = 5;

interface props {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const RatingModal = ({
  productId,
  isOpen,
  onClose,
  onSubmitSuccess,
}: props) => {
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      rating: 0,
      desc: "",
      photos: [],
    },
    validationSchema: RatingSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("rating", String(values.rating));
      if (values.desc) formData.append("desc", values.desc);
      values.photos.forEach((photo) => formData.append("files", photo));

      try {
        await api.post(`/api/reviews/${productId}`, formData);
        toast.success("Berhasil Memberikan Review!");
        onSubmitSuccess();
        onClose();
      } catch (error) {
        toast.error("Gagal Memberikan Review");
        console.error("Gagal Memberikan Review:" + error);
      }
    },
  });

  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  if (!isOpen) {
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;

    const newFiles = Array.from(event.currentTarget.files);
    const currentFiles = formik.values.photos;

    if (currentFiles.length + newFiles.length > maxPhotos) {
      toast.error(`Hanya bisa upload ${maxPhotos} gambar.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const allFiles = [...currentFiles, ...newFiles];

    formik.setFieldValue("photos", allFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (indexToRemove: number) => {
    URL.revokeObjectURL(photoPreviews[indexToRemove]);
    setPhotoPreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    formik.setFieldValue(
      "photos",
      formik.values.photos.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tulis Review</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={(hoverRating || formik.values.rating) >= star}
                  onClick={() => formik.setFieldValue("rating", star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.rating}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <AreaInputField
              formik={formik}
              fieldName="desc"
              label="Pendapat Tentang Produk Ini"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tambahkan Gambar
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={formik.values.photos.length >= maxPhotos}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Pilih Gambar
            </button>
            <p className="text-xs text-gray-500 mt-2">
              {formik.values.photos.length}/{maxPhotos} Max 1MB/Gambar
            </p>
            {formik.touched.photos &&
            typeof formik.errors.photos === "string" ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.photos}
              </p>
            ) : null}
          </div>

          {photoPreviews.length > 0 && (
            <div className="mb-6 grid grid-cols-3 sm:grid-cols-5 gap-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line */}
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {formik.status?.error && (
            <p className="text-red-500 text-center mb-4">
              {formik.status.error}
            </p>
          )}
          {formik.status?.success && (
            <p className="text-green-500 text-center mb-4">
              {formik.status.success}
            </p>
          )}

          <div className="flex items-center justify-end">
            <SubmitButton formik={formik} buttonText="Beri Review" />
          </div>
        </form>
      </div>
    </div>
  );
};
