"use client";

import { useState, useCallback } from "react";
import { useFormik } from "formik";
import { Camera } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import ProfileImageUploadModal from "@/components/profile/profileImageModal";
import axios from "axios";
import { apiUrl } from "@/config";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { IUser } from "@/interfaces/authInterfaces";
import { jwtDecode } from "jwt-decode";
import { UpdateProfileSchema } from "@/schemas/profileSchemas";
import ChangePasswordModal from "./changePasswordModal";

// --- Main Component ---
export default function AccountInfo() {
  const { user, login } = useAuthStore();
  // --- State Management ---
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const fetchUser = useCallback(async () => {
    const token = getCookie("access_token") as string;
    const response = await axios.get(`${apiUrl}/api/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newToken = response.data.data;

    const userData = jwtDecode<IUser>(newToken);

    login(userData);

    deleteCookie("access_token");

    setCookie("access_token", newToken, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }, [user, login]);

  // --- Formik Setup for Profile Information ---
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      try {
        const token = getCookie("access_token") as string;

        await axios.put(`${apiUrl}/api/users/${user.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchUser();

        setIsEditMode(false);

        alert("edit profile success");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = err.response.data.message;
          alert(`${errorMessage}`);
        } else {
          alert("An unexpected error occurred");
        }
      }
    },
  });

  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-base md:text-xl font-semibold text-blue-500">
          Informasi Akun
        </h2>
        <p className="mt-1 text-xs md:text-sm text-gray-500">
          Perbaharui informasi akunmu.
        </p>

        <div className="flex items-center justify-center gap-10 md:gap-20">
          <div className="group relative mt-6 flex cursor-pointer items-center justify-center gap-5">
            {/* eslint-disable-next-line */}
            <img
              src={
                user
                  ? user.imageUrl
                  : "https://placehold.co/128x128/6366f1/ffffff?text=Image"
              }
              alt="Profile picture"
              className="h-32 w-32 rounded-xl border border-gray-300 object-cover shadow-sm transition-all duration-300 group-hover:brightness-75 md:h-44 md:w-44 bg-gray-200"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/128x128/e0e0e0/757575?text=??";
              }}
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
            className="md:w-[400px] w-[200px] mt-6 space-y-6"
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
                  <input
                    id="name"
                    placeholder={user.name}
                    {...formik.getFieldProps("name")}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="w-full px-3 py-2">
                  <p>{user.name}</p>
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
                  <input
                    id="email"
                    type="email"
                    placeholder={user.email}
                    {...formik.getFieldProps("email")}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="w-full px-3 py-2">
                  <p>{user.email}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 sm:col-span-2">
              {/* Submit Button*/}
              {isEditMode ? (
                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto justify-center text-xs text-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 md:text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-wait"
                >
                  {formik.isSubmitting ? "Saving Changes..." : "Save Change"}
                </button>
              ) : (
                <div
                  className="inline-flex w-full sm:w-auto justify-center items-center text-xs text-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 md:py-2 md:px-6 md:text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-wait"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </div>
              )}
              <div
                className="inline-flex w-full sm:w-auto justify-center text-xs text-center rounded-md border border-transparent bg-red-600  py-1 px-3 md:py-2 md:px-6 md:text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-wait"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Ganti Password
              </div>
            </div>
          </form>
        </div>
      </div>
      <ProfileImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={() => fetchUser()}
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
