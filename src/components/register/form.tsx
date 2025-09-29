"use client";

import { useFormik } from "formik";
import { RegisterSchema } from "@/schemas/authSchemas";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/config";
import { IRegister } from "@/interfaces/authInterfaces";
import { EyeIcon } from "./icons";

export default function RegisterForm() {
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (
      values: IRegister,
      { setErrors }
    ) => {
      setFormSuccess("");
      setFormError("");
      try {
        await axios.post(`${apiUrl}/api/auth/register`, values);

        setFormSuccess("Berhasil membuat akun. Silakan login.");

        router.push("/login");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const status = err.response.status;
            const data = err.response.data;

            if (status === 400 || status === 422) {
              if (data.errors) {
                setErrors(data.errors); // Assuming Formik's setErrors for field-specific messages
                setFormError("Silakan perbaiki kesalahan di bawah ini.");
              } else {
                setFormError(data.message || "Terjadi masalah dengan validasi.");
              }
            } else if (status >= 500) {
              setFormError("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
            } else {
              setFormError(
                data.message || "Terjadi kesalahan. Silakan periksa detail Anda."
              );
            }
          } else if (err.request) {
            setFormError(
              "Tidak dapat terhubung ke server. Silakan periksa koneksi jaringan Anda."
            );
          } else {
            setFormError(
              "Terjadi kesalahan yang tidak terduga saat mengirim permintaan Anda."
            );
          }
        } else {
          console.error("An unexpected non-API error occurred:", err);
          setFormError("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
        }
      }
    },
  });

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans py-4 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Buat Akun
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="Nama"
                {...formik.getFieldProps("name")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps("password")}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)} />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button*/}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            className="w-full py-3 mt-4 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Membuat akun..." : "Buat Akun"}
          </button>

          {/* Display Success or Error Messages */}
          {formSuccess && (
            <div className="text-blue-600 bg-blue-100 p-3 rounded-md">
              {formSuccess}
            </div>
          )}
          {formError && (
            <div className="text-red-600 bg-red-100 p-3 rounded-md">
              {formError}
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Apakah kamu sudah punya akun?
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
