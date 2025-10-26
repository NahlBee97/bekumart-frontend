"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginSchema } from "@/schemas/authSchemas";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/useAuthStore";
import { IUser } from "@/interfaces/dataInterfaces";
import { useGoogleLogin } from "@react-oauth/google";

import { TextInputField } from "../formFields/textInputField";
import { SubmitButton } from "../buttons/submitButton";
import { GoogleButton } from "../buttons/googleButton";
import { CheckBox } from "../formFields/checkBox";

export default function LoginForm() {
  const { setAccessToken, login } = useAuthStore();
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
    onSubmit: async (values) => {
      try {
        const response = await api.post(`/api/auth/login`, values);

        // set token to cookie
        const { accessToken } = response.data;

        setAccessToken(accessToken);

        const userData = jwtDecode<IUser>(accessToken);
        login(userData);

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

  // --- Google Login Logic ---
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email } = userInfoResponse.data;

        const values = {
          name,
          email,
        };

        const response = await api.post(`/api/auth/google-login`, values);

        // set token to cookie
        const { accessToken } = response.data;

        setAccessToken(accessToken);

        const userData = jwtDecode<IUser>(accessToken);
        login(userData);
        toast.success("Berhasil Login");
        if (
          callbackUrl &&
          callbackUrl !== "/login" &&
          callbackUrl !== "/register" &&
          userData.role === "CUSTOMER"
        ) {
          router.push(callbackUrl);
        } else {
          router.push("/");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = err.response.data.message;
          console.error(`Login Gagal: ${errorMessage}`);
          toast.error("Login Gagal");
        } else {
          toast.error("An unexpected error occurred during login.");
        }
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Failed:", errorResponse);
      toast.error("Login Google Gagal");
    },
  });

  const handleResetPassword = async () => {
    const email = formik.values.email;
    await api.post(`/api/auth/verify-reset`, { email });
    toast("Kami sudah mengirimkan email untuk mengatur ulang password");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login Akun
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-2" noValidate>
          {/* Email Field */}
          <TextInputField
            formik={formik}
            type="email"
            fieldName="email"
            label=""
            withLabel={false}
            placeHolder="Email"
          />

          {/* Password Field */}
          <>
            {!isCorrectPassword && (
              <div
                className="text-xs text-red-500 mb-2 cursor-pointer hover:text-blue-500"
                onClick={handleResetPassword}
              >
                Lupa Password?
              </div>
            )}
            <TextInputField
              formik={formik}
              type={showPassword ? "text" : "password"}
              fieldName="password"
              label=""
              withLabel={false}
              placeHolder="Password"
            />
            <CheckBox
              isChecked={showPassword}
              onChecked={() => setShowPassword(!showPassword)}
              label="Lihat Password"
            />
          </>

          {/* Submit Button*/}
          <div className="w-full">
            <SubmitButton formik={formik} buttonText="Masuk" />
          </div>

          {/* --- OR Separator --- */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">Atau</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* --- Google Login Button --- */}
          <GoogleButton
            onLogin={googleLogin}
            buttonText="Masuk Dengan Google"
          />
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
