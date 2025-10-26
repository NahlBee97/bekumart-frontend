import * as Yup from "yup";

const maxPhotos = 5;
const maxFileSize = 5;
const maxFileSizeByte = maxFileSize * 1024 * 1024;
const allowTypes = ["image/jpeg", "image/png", "image/webp"];

export const RatingSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .required("Rating is required"),
  desc: Yup.string()
    .optional()
    .max(1000, "Comment must be 1000 characters or less"),
  photos: Yup.array()
    .of(
      Yup.mixed<File>()
        .test(
          "fileSize",
          `File is too large. Max size is ${maxFileSize}MB.`,
          (value): value is File => !value || value.size <= maxFileSizeByte
        )
        .test(
          "fileType",
          "Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
          (value): value is File =>
            !value || (value && allowTypes.includes(value.type))
        )
    )
    .max(maxPhotos, `You can upload a maximum of ${maxPhotos} photos.`),
});
