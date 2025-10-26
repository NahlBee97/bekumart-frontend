import * as Yup from "yup";

const maxPhotos = 5;
const maxFileSize = 5;
const maxFileSizeByte = maxFileSize * 1024 * 1024;
const allowTypes = ["image/jpeg", "image/png", "image/webp"];

export const RatingSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Silakan pilih rating")
    .required("Rating wajib diisi"),
  desc: Yup.string()
    .optional()
    .max(1000, "Komentar tidak boleh lebih dari 1000 karakter"),
  photos: Yup.array()
    .of(
      Yup.mixed<File>()
        .test(
          "fileSize",
          `Ukuran file terlalu besar. Maksimal ${maxFileSize}MB.`,
          (value): value is File => !value || value.size <= maxFileSizeByte
        )
        .test(
          "fileType",
          "Tipe file tidak valid. Hanya JPEG, PNG, dan WEBP yang diizinkan.",
          (value): value is File =>
            !value || (value && allowTypes.includes(value.type))
        )
    )
    .max(maxPhotos, `Anda dapat mengunggah maksimal ${maxPhotos} foto.`),
});
