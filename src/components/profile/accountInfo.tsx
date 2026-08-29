"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useState, useCallback } from "react";
import { Camera } from "lucide-react";
import { getUserData } from "@/lib/data";
import { useAuthStore } from "@/stores/useAuthStore";
import { UpdateProfileSchema } from "@/schemas/profileSchemas";

import { ProfileImageUploadModal } from "@/components/profile/profileImageModal";
import { ChangePasswordModal } from "./changePasswordModal";
import { AccountInfoSkeleton } from "../skeletons/profile/accountInfoSkeleton";
import { TextInputField } from "../formFields/textInputField";
import { SubmitButton } from "../buttons/submitButton";
import { TinyCommonButton } from "../buttons/tinyCommonButton";

export default function AccountInfo() {
  const { user, login, isAuthLoading } = useAuthStore();

  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const refreshUser = useCallback(async () => {
    try {
      if (isAuthLoading || !user?.id) return;

      const userData = await getUserData(user?.id);

      login(userData);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  }, [user, login, isAuthLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user || {
      name: "",
      email: "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      try {
        await api.put(`/api/users/${user?.id}`, values);

        refreshUser();

        setIsEditMode(false);

        toast.success("edit profile berhasil");
      } catch (error) {
        console.error("Error editing profile: " + error);
        toast.error("Gagal edit profile");
      }
    },
  });

  if (isAuthLoading) return <AccountInfoSkeleton />;

  return (
    <div className="bg-white shadow-sm shadow-ink/5 rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="font-display text-base md:text-xl font-semibold text-ink">
          Informasi Akun
        </h2>

        <div className="flex flex-col md:flex-row gap-5 mt-4">
          <div className="group relative flex cursor-pointer items-center justify-center gap-5">
            {/* eslint-disable-next-line */}
            <img
              src={
                user?.imageUrl
                  ? user.imageUrl
                  : "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
              }
              alt="Profile picture"
              className="h-32 w-32 rounded-2xl object-cover shadow-sm transition-all duration-300 group-hover:brightness-75 md:h-44 md:w-44 bg-mist"
            />

            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink opacity-0 shadow-md transition-opacity duration-300 hover:bg-slate-50 group-hover:opacity-100"
            >
              <Camera className="h-5 w-5 text-frost-deep" />
              <span className="hidden md:block">Ganti</span>
            </button>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="md:w-[400px] w-[200px] space-y-4"
          >
            {/* Username Input */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-fog mb-1"
              >
                Nama
              </label>
              {isEditMode ? (
                <>
                  <TextInputField
                    formik={formik}
                    type="text"
                    fieldName="name"
                    label=""
                    withLabel={false}
                    placeHolder=""
                  />
                </>
              ) : (
                <div className="w-full px-3 py-2">
                  <p className="text-ink">{user?.name}</p>
                </div>
              )}
            </div>
            {/* Email Input */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-fog mb-1"
              >
                Email
              </label>
              {isEditMode ? (
                <>
                  <TextInputField
                    formik={formik}
                    type="email"
                    fieldName="email"
                    label=""
                    withLabel={false}
                    placeHolder=""
                  />
                </>
              ) : (
                <div className="w-full px-3 py-2">
                  <p className="text-ink">{user?.email}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 sm:col-span-2">
              {/* Submit Button*/}
              {isEditMode ? (
                <SubmitButton formik={formik} buttonText="Simpan" />
              ) : (
                <TinyCommonButton
                  onClick={() => setIsEditMode(true)}
                  isPositive={true}
                  buttonText="Edit"
                />
              )}
              {isEditMode ? (
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  disabled={formik.isSubmitting}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-full shadow-sm hover:bg-red-600 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
              ) : (
                <TinyCommonButton
                  onClick={() => setIsPasswordModalOpen(true)}
                  isPositive={false}
                  buttonText="Ganti Password"
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <ProfileImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={() => refreshUser()}
        user={user}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={user}
      />
    </div>
  );
}
