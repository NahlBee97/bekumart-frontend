"use client";

import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { IProduct, IProductPhoto } from "@/interfaces/productInterfaces";
import PhotoThumbnail from "./photoThumbnail";
import AddPhotoButton from "./addPhotoButton";
import axios from "axios";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";

const ProductPhotoModal = ({
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
  const [mainImage, setMainImage] = useState<IProductPhoto | null>(null);
  const [photos, setPhotos] = useState<IProductPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State to track which photo we are currently updating
  const [photoToUpdateId, setPhotoToUpdateId] = useState<string | null>(null);

  const fetchProductPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/product-photos/${product?.id}`
      );
      setPhotos(data.data);
    } catch (error) {
      console.error("Error fetching product photos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      fetchProductPhotos();
    }
  }, [product, fetchProductPhotos]);

  useEffect(() => {
    const mainPhoto = photos.find((photo) => photo.isDefault === true);
    if (mainPhoto) setMainImage(mainPhoto);
  }, [photos]);

  if (!isOpen) return null;

  // Triggers the hidden file input
  const triggerFileInput = (photoId: string | null = null) => {
    setPhotoToUpdateId(photoId); // If null, it's a new photo. Otherwise, it's an update.
    fileInputRef.current?.click();
  };

  // Handles the actual file selection and update
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const token = getCookie("access_token") as string;
      const file = event.target.files?.[0];

      if (!file) throw new Error("No file");

      const formData = new FormData();
      formData.append("file", file);

      // Simulate upload and create a temporary local URL for preview
      setIsLoading(true);

      if (photoToUpdateId) {
        await axios.patch(
          `${apiUrl}/api/product-photos/${photoToUpdateId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("berhasil mengganti photo");
      } else {
        await axios.post(
          `${apiUrl}/api/product-photos/${product?.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("berhasil menambahkan photo");
      }
      onSave();
      fetchProductPhotos();
      setIsLoading(false);
      setPhotoToUpdateId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Sets a photo as the main product image
  const handleSetMain = async (photoId: string) => {
    setIsLoading(true);
    const token = getCookie("access_token") as string;
    await axios.put(
      `${apiUrl}/api/product-photos/${photoId}`,
      {
        isDefault: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchProductPhotos();
    setIsLoading(false);
    alert("Berhasil menjadikan photo utama");
  };

  const handleDelete = async (photoId: string) => {
    const token = getCookie("access_token") as string;
    if (confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      setIsLoading(true);
      const photoToDelete = photos.find((photo) => photo.id === photoId);
      if (photoToDelete === mainImage) {
        alert("Tidak dapat menghapus foto yang sedang dijadikan foto utama.");
        return;
      }
      await axios.delete(`${apiUrl}/api/product-photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProductPhotos();
      alert("berhasil menghapus photo");
    }
    setIsLoading(false);
  };

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
                src={mainImage?.imageUrl}
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
                  onSetMain={() => handleSetMain(photo.id)}
                  onUpdate={() => triggerFileInput(photo.id)}
                  onDelete={() => handleDelete(photo.id)}
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
    </div>
  );
};

export default ProductPhotoModal;
