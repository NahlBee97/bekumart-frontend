"use client";

import { apiUrl } from "@/config";
import { IProduct } from "@/interfaces/productInterfaces";
import axios from "axios";
import { getCookie } from "cookies-next";
import { FC, useEffect, useState } from "react";

// --- IMAGE UPLOAD MODAL ---
interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: IProduct | null;
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setPreviewUrl(product.imageUrl || null);
    }
    return () => {
      // Cleanup object URL
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const token = getCookie("access_token") as string;
    if (!token) throw new Error("restricted");
    try {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);
      await axios.patch(`${apiUrl}/api/products/${product.id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      alert("Image uploaded successfully!");
      setLoading(false);
      onSave();
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Change Product Image
          </h2>
          <p className="text-sm text-gray-600">for {product.name}</p>
        </div>
        <div className="p-6 space-y-4">
          {/* eslint-disable-next-line */}
          <img
            src={
              previewUrl ||
              "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
            }
            alt="Product preview"
            className="w-full h-64 object-contain rounded-lg bg-gray-100"
          />
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full text-center block"
            >
              {file ? `Selected: ${file.name}` : "Choose a file..."}
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end items-center gap-4 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!file || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload & Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
