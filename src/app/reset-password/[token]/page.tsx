"use client";

import { use, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangePasswordSchema } from "@/schemas/authSchemas";
import api from "@/lib/axios";

export interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPassword({ params }: Props) {
  const router = useRouter();

  const resolvedParams = use(params);

  const token = decodeURIComponent(resolvedParams.token);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      // make api call here
      try {
        const password = values.confirmPassword;

        if (!token) throw new Error("Token not provided");

        await api.patch(`/api/auth/set-password`, {
          password,
          token,
        });

        alert("Set password successfully.");

        router.push("/login");
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
    <div className="bg-gray-100 flex flex-col items-center justify-center font-sans py-4 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Ganti password baru
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password Baru"
                {...formik.getFieldProps("newPassword")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          {/* Confirm Password Field */}
          <div>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Konfirmasi Password"
                {...formik.getFieldProps("confirmPassword")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            <input
              className="mt-2 h-2"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            <label className="text-gray-600 text-xs">Lihat Password</label>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          {/* Submit Button*/}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            className="w-full flex items-center justify-center py-3 mt-4 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Ganti Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
