import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nama produk terlalu pendek!")
    .required("Nama produk wajib diisi"),
  price: Yup.number()
    .min(0, "Harga tidak boleh negatif")
    .required("Harga wajib diisi"),
  stock: Yup.number()
    .integer("Stok harus berupa bilangan bulat")
    .min(0, "Stok tidak boleh negatif")
    .required("Stok wajib diisi"),
  weightInKg: Yup.number()
    .min(0, "Berat tidak boleh negatif")
    .required("Berat wajib diisi"),
  category: Yup.object()
    .shape({
      id: Yup.string().required("Silakan pilih kategori"),
    })
    .required("Silakan pilih kategori"),
  description: Yup.string().max(500, "Deskripsi terlalu panjang"),
});
