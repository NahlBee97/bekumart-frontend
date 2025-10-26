"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { ContactSchema } from "@/schemas/contactSchema";
import { TextInputField } from "@/components/formFields/textInputField";
import { AreaInputField } from "@/components/formFields/areaInputField";
import { SubmitButton } from "@/components/buttons/submitButton";

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
                <TextInputField formik={formik} type="text" fieldName="name" label="Nama" withLabel={true} placeHolder="" />
                <TextInputField formik={formik} type="email" fieldName="email" label="Email" withLabel={true} placeHolder=""/>
                <AreaInputField formik={formik} fieldName="message" label="Pesan Anda"/>
                <SubmitButton formik={formik} buttonText="Kirim Pesan"/>
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
