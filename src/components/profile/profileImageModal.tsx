"use client";

import { IUser } from "@/interfaces/dataInterfaces";
import api from "@/lib/axios";
import { getCookie } from "cookies-next";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

// --- IMAGE UPLOAD MODAL ---
interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  user: IUser | null;
}

const ProfileImageUploadModal: FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- CHANGE 1: Add state and useEffect for the animation ---
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Use a tiny timeout to let the element render before starting the transition
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setPreviewUrl(user.imageUrl || null);
    }
    return () => {
      // Cleanup object URL
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const token = getCookie("token") as string;
    if (!token) return;
    try {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);
      await api.patch(`/api/users/${user.id}`, formData);
      toast.success("Berhasil Upload Photo");
      setLoading(false);
      onSave();
      onClose();
    } catch (error) {
      toast.error("Gagal Upload Photo");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-500">
            Mengganti Foto Profil
          </h2>
          <p className="text-sm text-gray-600">untuk {user.name}</p>
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
              {file ? `Memilih: ${file.name}` : "Pilih Foto..."}
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
            className="w-40 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Upload & Simpan"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploadModal;
