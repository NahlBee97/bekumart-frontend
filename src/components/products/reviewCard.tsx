import { Heart } from "lucide-react";
import { StarRatingDetail } from "./starRating";
import { IReview } from "@/interfaces/dataInterfaces";
import { format } from "date-fns";

export const ReviewCard = ({ reviews }: { reviews: IReview[] }) => {
  if (reviews.length === 0)
    return (
      <div className="border-t border-gray-200 py-6">
        <h2 className="text-center text-lg text-blue-500 font-semibold">
          Belum ada review untuk produk ini
        </h2>
      </div>
    );

  return (
    <div className="border-t border-gray-200 py-4 space-y-2">
      {reviews.map((review: IReview) => (
        <div
          key={review.id}
          className="flex items-start space-x-4 border-t border-gray-200 py-2"
        >
          {/* eslint-disable-next-line */}
          <img
            src={review.user?.imageUrl as string}
            alt={review.user?.name}
            className="rounded-full w-10 h-10 object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">{review.user?.name}</p>
            <div className="my-1">
              <StarRatingDetail rating={review.rating} />
            </div>
            <p className="text-xs text-gray-500">
              {format(review.createdAt, "dd MMMM yyy")}
            </p>

            <p className="mt-4 text-sm text-gray-800 leading-relaxed">
              {review.review}
            </p>

            <div className="mt-4 flex w-20 h-20 gap-1">
              {review.reviewPhotos?.map((photo, index) => (
                <div key={review.id} className="relative aspect-square">
                  {/* eslint-disable-next-line */}
                  <img
                    src={photo.imageUrl}
                    alt={`Review image ${index + 1}`}
                    className="absolute w-20 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center text-gray-500 gap-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{review.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
