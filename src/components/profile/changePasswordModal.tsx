"use client";

import { apiUrl } from "@/config";
import { IPasswordChange, IUser } from "@/interfaces/authInterfaces";
import { ChangePasswordSchema } from "@/schemas/authSchemas";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { EyeIcon } from "../register/icons";

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

  const formik = useFormik<IPasswordChange>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      try {
        const token = getCookie("access_token") as string;

        await axios.patch(`${apiUrl}/api/users/password/${user?.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            Change Password
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
                New Password
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
                <EyeIcon onClick={() => setShowPassword(!showPassword)} />
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
                Confirm Password
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
                <EyeIcon onClick={() => setShowPassword(!showPassword)} />
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>{" "}
          </div>

          <div className="flex items-center justify-end p-5 space-x-4 border-t border-gray-200 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* This is a simple animation style block you might need to add to your global CSS or a style tag */}
        <style jsx global>{`
          @keyframes fade-in-scale {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
