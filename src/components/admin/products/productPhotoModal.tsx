"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { PhotoThumbnail } from "./photoThumbnail";
import { AddPhotoButton } from "./addPhotoButton";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import { ConfirmModal } from "@/components/confirmModal";
import { IProduct, IProductPhoto } from "@/interfaces/dataInterfaces";
import { useFormik } from "formik";
import { ProductPhotoSchema } from "@/schemas/productPhotoSchema";

export const ProductPhotoModal = ({
  isOpen,
  onSave,
  onClose,
  product,
}: {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
  product: IProduct | null;
}) => {
  const { isAuthLoading } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mainImage, setMainImage] = useState<IProductPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [photoToDelete, setPhotoTodelete] = useState<IProductPhoto | null>(
    null
  );
  const [photos, setPhotos] = useState<IProductPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // State to track which photo we are currently updating
  const [photoToUpdateId, setPhotoToUpdateId] = useState<string | null>(null);

  const fetchProductPhotos = useCallback(async () => {
    if (isAuthLoading) return;
    setIsLoading(true);
    try {
      const { data } = await api.get(`/api/product-photos/${product?.id}`);
      const mainPhoto = data.data.find(
        (photo: IProductPhoto) => photo.isDefault === true
      );
      setPhotos(data.data);
      setMainImage(mainPhoto);
    } catch (error) {
      console.error("Error fetching product photos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [product, isAuthLoading]);

  useEffect(() => {
    if (product) {
      fetchProductPhotos();
    }
  }, [product, fetchProductPhotos]);

  // Triggers the hidden file input
  const triggerFileInput = (photoId: string | null = null) => {
    setPhotoToUpdateId(photoId); // If null, it's a new photo. Otherwise, it's an update.
    fileInputRef.current?.click();
  };

  const formik = useFormik({
    initialValues: {
      photo: null as File | null,
    },
    validationSchema: ProductPhotoSchema,
    onSubmit: async (values) => {
      try {
        if (!values.photo) return;

        const formData = new FormData();
        formData.append("file", values.photo);

        setIsLoading(true);

        if (photoToUpdateId) {
          await api.patch(`/api/product-photos/${photoToUpdateId}`, formData);
          toast.success("Berhasil mengganti foto");
        } else {
          await api.post(`/api/product-photos/${product?.id}`, formData);
          toast.success("Berhasil menambahkan foto");
        }
        onSave();
        fetchProductPhotos();
        formik.resetForm();
      } catch (error) {
        toast.error("Gagal memproses foto");
        console.error(error);
      } finally {
        setIsLoading(false);
        setPhotoToUpdateId(null);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("photo", file).then(() => {
        if (!formik.errors.photo) {
          formik.submitForm();
        } else {
          toast.error(formik.errors.photo);
        }
      });
    }
  };

  // Sets a photo as the main product image
  const confirmSetMain = async (photo: IProductPhoto) => {
    try {
      setIsLoading(true);
      await api.put(`/api/product-photos/${photo.id}`, {
        isDefault: true,
      });
      fetchProductPhotos();
      toast.success("Berhasil menjadikan photo utama");
    } catch (error) {
      toast.error("Gagal menjadikan photo utama");
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsConfirmModalOpen(false);
    }
  };

  const confirmDelete = async (photo: IProductPhoto) => {
    try {
      setIsLoading(true);
      if (photo.isDefault === true) {
        toast.error(
          "Tidak dapat menghapus foto yang sedang dijadikan foto utama."
        );
        return;
      }
      await api.delete(`/api/product-photos/${photo.id}`);
      fetchProductPhotos();
      toast.success("berhasil menghapus photo");
    } catch (error) {
      toast.error("Gagal menghapus photo");
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
      setIsConfirmModalOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-transform scale-95 animate-fade-in-up">
        {/* --- Header --- */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Kelola Foto Produk
            </h2>
            <p className="text-sm text-gray-500">{product?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="flex-grow p-6 overflow-y-auto grid md:grid-cols-2 gap-6">
          {/* Main Image Preview */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-semibold text-gray-700">Foto Utama</h3>
            <div className="w-50 bg-gray-200 border border-gray-200 rounded-md shadow-xl">
              {/* eslint-disable-next-line */}
              <img
                src={
                  mainImage?.imageUrl
                    ? mainImage.imageUrl
                    : "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
                }
                alt="Foto utama produk"
                className="w-50 h-50 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x600/CCCCCC/FFFFFF?text=Gagal+Muat";
                }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Pilih foto dari galeri di samping untuk dijadikan foto utama.
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-gray-700">
              Galeri Foto ({photos.length}/8)
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <PhotoThumbnail
                  key={photo.id}
                  photo={photo}
                  isMain={photo.imageUrl === mainImage?.imageUrl}
                  onSetMain={() => {
                    setPhotoTodelete(photo);
                    setIsConfirmModalOpen(true);
                  }}
                  onUpdate={() => triggerFileInput(photo.id)}
                  onDelete={() => {
                    setIsDeleting(true);
                    setPhotoTodelete(photo);
                    setIsConfirmModalOpen(true);
                  }}
                />
              ))}
              {photos.length < 8 && (
                <AddPhotoButton onClick={() => triggerFileInput(null)} />
              )}
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />

        {/* --- Footer & Actions --- */}
        <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-end items-center space-x-3">
          <button
            onClick={() => {
              onClose();
              onSave();
            }}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Selesai"}
          </button>
        </div>
      </div>
      {/* The <style jsx> tag was causing a React warning because the environment might not be
        processing styled-jsx correctly. Replaced with a standard <style> tag to define
        the necessary animation keyframes. This style is now global but resolves the error.
      */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() =>
          isDeleting
            ? confirmDelete(photoToDelete as IProductPhoto)
            : confirmSetMain(photoToDelete as IProductPhoto)
        }
        title={isDeleting ? "Hapus Photo?" : "Atur Sebagai Photo Utama"}
        confirmText={isDeleting ? "Hapus" : "Konfirmasi"}
      />
    </div>
  );
};
