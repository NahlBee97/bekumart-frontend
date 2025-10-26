import { StarRatingDetail } from "./starRating";
import { IReview, IReviewLike } from "@/interfaces/dataInterfaces";
import { format } from "date-fns";
import { LikeButton } from "./likeButton";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatNumberCompact } from "@/helper/functions";

export const ReviewCard = ({ review }: { review: IReview }) => {
  const { isAuthLoading, accessToken } = useAuthStore();
  const [isReviewLiked, setIsReviewLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likeCount);

  const handleLikeToggle = async () => {
    if (!accessToken) return;
    const newIsLiked = !isReviewLiked;

    setIsReviewLiked(newIsLiked);

    if (newIsLiked) {
      setLikeCount((prev) => prev + 1);
      await api.patch(`/api/reviews/like`, { reviewId: review.id });
    } else {
      setLikeCount((prev) => prev - 1);
      await api.patch(`/api/reviews/unlike`, { reviewId: review.id });
    }
  };

  useEffect(() => {
    if (isAuthLoading || !accessToken) return;
    const fetchLikes = async () => {
      const response = await api.get("/api/reviews/likes");
      const isLiked = response.data.likes.some(
        (like: IReviewLike) => like.reviewId === review.id
      );
      setIsReviewLiked(isLiked);
    };
    fetchLikes();
  }, [review, isAuthLoading, accessToken]);

  return (
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
          {review.desc}
        </p>

        {review.reviewPhotos.length > 0 && (
          <div className="mt-4 flex w-20 h-20 gap-1">
            {review.reviewPhotos?.map((photo, index) => (
              <div key={photo.id} className="relative aspect-square">
                {/* eslint-disable-next-line */}
                <img
                  src={photo.imageUrl}
                  alt={`Review image ${index + 1}`}
                  className="absolute w-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center text-gray-500 gap-1">
          <LikeButton hasLiked={isReviewLiked} onClick={handleLikeToggle} />
          <span className="text-sm font-medium">
            {formatNumberCompact(likeCount)}
          </span>
        </div>
      </div>
    </div>
  );
};
