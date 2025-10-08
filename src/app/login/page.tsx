"use client";

import { useFormik } from "formik";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiUrl } from "@/config";
import { ILogin, IUser } from "@/interfaces/authInterfaces";
import { LoginSchema } from "@/schemas/authSchemas";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // This code only runs in the browser
    const urlParams = new URLSearchParams(window.location.search);
    const urlFromParams = urlParams.get("callbackUrl");
    if (urlFromParams) {
      setCallbackUrl(urlFromParams);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: ILogin) => {
      try {
        const response = await axios.post(`${apiUrl}/api/auth/login`, values);

        // set token to cookie
        const token = response.data.data;

        setCookie("access_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 1000),
        });

        const userData = jwtDecode<IUser>(token);

        if (userData.role === "ADMIN") {
          router.push("/admin");
        } else if (
          callbackUrl &&
          callbackUrl !== "/login" &&
          callbackUrl !== "/register" &&
          userData.role === "CUSTOMER"
        ) {
          router.push(callbackUrl);
        } else {
          router.push("/");
        }
        toast.success("Berhasil Login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.data.message === "Incorrect Password")
            setIsCorrectPassword(false);
          toast.error("Password Salah!");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  const handleResetPassword = async () => {
    const email = formik.values.email;
    await axios.post(`${apiUrl}/api/auth/verify-reset`, { email });
    toast("Kami sudah mengirimkan email untuk mengatur ulang password");
  }


  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login Akun
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              {!isCorrectPassword && (
                <div className="text-xs text-red-500" onClick={handleResetPassword}>
                  Lupa Password?
                </div>
              )}
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
              <input
                className="mt-2 h-2"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              <label className="text-gray-600 text-xs">Lihat Password</label>
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
            className="w-full flex items-center justify-center py-3 mt-4 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Belum punya akun?
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:underline ml-1"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
