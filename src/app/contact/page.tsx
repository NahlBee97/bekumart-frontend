"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import * as Yup from "yup";

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama terlalu pendek")
    .max(50, "Nama terlalu panjang")
    .required("Nama wajib diisi"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email wajib diisi"),
  message: Yup.string()
    .min(10, "Pesan terlalu pendek")
    .max(1000, "Pesan terlalu panjang")
    .required("Pesan wajib diisi"),
});

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await api.post("/api/contact", values);
        toast.success("Berhasil mengirim pesan");
        resetForm();
      } catch (error) {
        toast.error("Tidak dapat mengirim pesan");
        console.error("Tidak dapat mengirim pesan:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <main className="bg-slate-50">
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500">
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Punya pertanyaan atau masukan? Kami siap membantu Anda!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...formik.getFieldProps('name')}
                    aria-describedby={formik.errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                      ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-500" id="name-error">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    aria-describedby={formik.errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                      ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-500" id="email-error">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    {...formik.getFieldProps('message')}
                    rows={5}
                    aria-describedby={formik.errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                      ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-sm text-red-500" id="message-error">
                      {formik.errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 mt-4 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Informasi Kontak
              </h2>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Kuliner No. 123, Desa Rato, Sila, 84161, NTB.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <Mail className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@bekumart.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <Phone className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Telepon</h3>
                  <p className="text-gray-600">0821 4478 5677</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
