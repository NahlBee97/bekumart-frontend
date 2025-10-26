import * as Yup from "yup";

export const AddressSchema = Yup.object().shape({
  street: Yup.string().required("Alamat jalan wajib diisi"),
  subdistrict: Yup.string().required("Kelurahan wajib diisi"),
  district: Yup.string().required("Kecamatan wajib diisi"),
  city: Yup.string().required("Kota wajib diisi"),
  province: Yup.string().required("Provinsi wajib diisi"),
  postalCode: Yup.string().required("Kode pos wajib diisi"),
  phone: Yup.string().required("Nomor telepon wajib diisi"),
});
