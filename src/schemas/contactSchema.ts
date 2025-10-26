import * as Yup from "yup";

export const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama terlalu pendek")
    .max(50, "Nama terlalu panjang")
    .required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  message: Yup.string()
    .min(10, "Pesan terlalu pendek")
    .max(1000, "Pesan terlalu panjang")
    .required("Pesan wajib diisi"),
});
