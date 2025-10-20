import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { FC } from "react";
import api from "@/lib/axios";

// --- Helper Components & Icons ---

const StarIcon: FC<{
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`w-8 h-8 cursor-pointer transition-transform duration-200 ${
      filled ? "text-yellow-400" : "text-gray-300"
    } hover:scale-125`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.654H5.25a.75.75 0 01-.749-.654L3.495 6.66l-.209.035a.75.75 B 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.347-9zm5.459 0a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.347-9z"
      clipRule="evenodd"
    />
  </svg>
);

const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Constants & Types ---

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ReviewFormValues {
  rating: number;
  desc: string;
  photos: File[];
}

interface ReviewModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

// --- Main Modal Component ---

const RatingModal: FC<ReviewModalProps> = ({
  productId,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const formik = useFormik<ReviewFormValues>({
    initialValues: {
      rating: 0,
      desc: "",
      photos: [],
    },
    validationSchema: Yup.object({
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
              `File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`,
              (value): value is File =>
                !value || value.size <= MAX_FILE_SIZE_BYTES
            )
            .test(
              "fileType",
              "Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
              (value): value is File =>
                !value || (value && ALLOWED_MIME_TYPES.includes(value.type))
            )
        )
        .max(MAX_PHOTOS, `You can upload a maximum of ${MAX_PHOTOS} photos.`),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null);
      const formData = new FormData();
      formData.append("rating", String(values.rating));
      if (values.desc) formData.append("desc", values.desc);
      values.photos.forEach((photo) => formData.append("files", photo));

      try {
        await api.post(`/api/reviews/${productId}`, formData);
        setStatus({ success: "Thank you! Your review has been submitted." });
        onSubmitSuccess();
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error: any) {
        setStatus({ error: error.message });
        setSubmitting(false);
      }
    },
  });

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  // Effect to close modal on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const newFiles = Array.from(event.currentTarget.files);
    const currentFiles = formik.values.photos;
    if (currentFiles.length + newFiles.length > MAX_PHOTOS) {
      alert(`You can only upload a maximum of ${MAX_PHOTOS} photos.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const allFiles = [...currentFiles, ...newFiles];
    formik.setFieldValue("photos", allFiles);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (indexToRemove: number) => {
    URL.revokeObjectURL(photoPreviews[indexToRemove]);
    setPhotoPreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    formik.setFieldValue(
      "photos",
      formik.values.photos.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Write a Review
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={(hoverRating || formik.values.rating) >= star}
                  onClick={() => formik.setFieldValue("rating", star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.rating}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="desc"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Your Review
            </label>
            <textarea
              id="desc"
              name="desc"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What did you like or dislike?"
            />
            {formik.touched.desc && formik.errors.desc ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.desc}
              </p>
            ) : null}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Add Photos
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="photo-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={formik.values.photos.length >= MAX_PHOTOS}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Choose Files
            </button>
            <p className="text-xs text-gray-500 mt-2">
              {formik.values.photos.length}/{MAX_PHOTOS} photos added. Max 5MB
              each.
            </p>
            {formik.touched.photos &&
            typeof formik.errors.photos === "string" ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.photos}
              </p>
            ) : null}
          </div>

          {photoPreviews.length > 0 && (
            <div className="mb-6 grid grid-cols-3 sm:grid-cols-5 gap-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  {/* eslint-disable-next-line */}
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {formik.status?.error && (
            <p className="text-red-500 text-center mb-4">
              {formik.status.error}
            </p>
          )}
          {formik.status?.success && (
            <p className="text-green-500 text-center mb-4">
              {formik.status.success}
            </p>
          )}

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            >
              {formik.isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
