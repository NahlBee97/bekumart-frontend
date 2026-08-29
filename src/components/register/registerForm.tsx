"use client";

import Link from "next/link";
import axios from "axios";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { RegisterSchema } from "@/schemas/authSchemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/dataInterfaces";
import { Snowflake } from "lucide-react";

import { TextInputField } from "../formFields/textInputField";
import { CheckBox } from "../formFields/checkBox";
import { SubmitButton } from "../buttons/submitButton";
import { GoogleButton } from "../buttons/googleButton";

export default function RegisterForm() {
  const { setAccessToken, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        await api.post(`/api/auth/register`, values);

        toast.success("Berhasil membuat akun. Silakan login.");

        router.push("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the raw Google access token to the backend and let it
        // verify the account with Google itself - never trust profile
        // data resolved on the client for authentication.
        const response = await api.post(`/api/auth/google-login`, {
          accessToken: tokenResponse.access_token,
        });

        // set token to cookie
        const { accessToken } = response.data;

        setAccessToken(accessToken);

        const userData = jwtDecode<IUser>(accessToken);
        login(userData);
        toast.success("Berhasil Daftar");
        router.push("/");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = err.response.data.message;
          console.error(`Daftar Gagal: ${errorMessage}`);
          toast.error("Daftar Gagal");
        } else {
          toast.error("An unexpected error occurred during register.");
        }
      }
    },
    onError: (errorResponse) => {
      console.error("Google Daftar Failed:", errorResponse);
      toast.error("Daftar Google Gagal");
    },
  });

  return (
    <div className="bg-mist flex items-center justify-center min-h-screen font-sans py-8 px-4">
      <div className="animate-fade-up bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-ink/5 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="frost-shimmer bg-gradient-to-br from-frost to-frost-deep rounded-2xl p-3 mb-3">
            <Snowflake className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-center text-ink">
            Buat Akun BekuMart
          </h1>
          <p className="text-sm text-fog mt-1">Gabung dan mulai belanja frozen food</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-2" noValidate>
          {/* Name Field */}
          <TextInputField
            formik={formik}
            type="text"
            fieldName="name"
            label=""
            withLabel={false}
            placeHolder="Nama"
          />
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
          <SubmitButton formik={formik} buttonText="Buat Akun" />

          {/* --- OR Separator --- */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-fog text-sm">Atau</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* --- Google Login Button --- */}
          <GoogleButton
            onLogin={googleLogin}
            buttonText="Daftar Dengan Google"
          />
        </form>

        <p className="text-center text-sm text-fog mt-8">
          Apakah kamu sudah punya akun?
          <Link
            href="/login"
            className="font-semibold text-frost-deep hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
