import * as Yup from "yup";

const maxFileSize = 5; // 5MB
const maxFileSizeByte = maxFileSize * 1024 * 1024;
const allowTypes = ["image/jpeg", "image/png", "image/webp"];

export const ProductPhotoSchema = Yup.object().shape({
  photo: Yup.mixed()
    .required("Silakan pilih foto")
    .test(
      "fileSize",
      `Ukuran file terlalu besar. Maksimal ${maxFileSize}MB`,
      (value) => {
        if (!value) return true;
        return (value as File).size <= maxFileSizeByte;
      }
    )
    .test(
      "fileType",
      "Tipe file tidak valid. Hanya JPEG, PNG, dan WEBP yang diizinkan",
      (value) => {
        if (!value) return true;
        return allowTypes.includes((value as File).type);
      }
    ),
});
