"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
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
      if (isAuthLoading) return;

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
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = err.response.data.message;
          toast.error(`${errorMessage}`);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  if (isAuthLoading) return <AccountInfoSkeleton />;

  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-base md:text-xl font-semibold text-blue-500">
          Informasi Akun
        </h2>
        <p className="mt-1 text-xs md:text-sm text-gray-500">
          Perbaharui informasi akunmu.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20">
          <div className="group relative mt-6 flex cursor-pointer items-center justify-center gap-5">
            {/* eslint-disable-next-line */}
            <img
              src={
                user.imageUrl
                  ? user.imageUrl
                  : "https://placehold.co/400x400/e2e8f0/64748b?text=N/A"
              }
              alt="Profile picture"
              className="h-32 w-32 rounded-xl border border-gray-300 object-cover shadow-sm transition-all duration-300 group-hover:brightness-75 md:h-44 md:w-44 bg-gray-200"
            />

            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 transition-opacity duration-300 hover:bg-gray-50 group-hover:opacity-100"
            >
              <Camera className="h-5 w-5 text-gray-600" />
              <span className="hidden md:block">Change</span>
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
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  <p>{user?.name}</p>
                </div>
              )}
            </div>
            {/* Email Input */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  <p>{user?.email}</p>
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
                <TinyCommonButton
                  onClick={() => setIsEditMode(false)}
                  isPositive={false}
                  buttonText="Batal"
                />
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
