"use client";

import { IUser } from "@/interfaces/dataInterfaces";
import api from "@/lib/axios";
import { ChangePasswordSchema } from "@/schemas/authSchemas";
import axios from "axios";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";

// --- IMAGE UPLOAD MODAL ---
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      try {
        await api.patch(`/api/users/password/${user?.id}`, values, );

        alert("change password success");
        onClose();
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

  if (!isOpen || !user) return null;

  return (
    // --- CHANGE 2: Add transition and conditional opacity to the backdrop ---
    <div
      className={`fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* --- CHANGE 3: Remove the keyframes class and use conditional transition classes --- */}
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-semibold text-blue-500">
            Mengganti Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="p-6 space-y-6">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("newPassword")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.touched.newPassword && formik.errors.newPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("confirmPassword")}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
              <input
                className="mt-2"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              <label>Lihat Password</label>
            </div>{" "}
          </div>

          <div className="flex items-center justify-end p-5 space-x-4 border-t border-gray-200 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batalkan
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-40 flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
