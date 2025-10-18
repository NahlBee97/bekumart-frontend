import { Heart } from "lucide-react";
import { StarRatingDetail } from "./starRating";

interface ReviewCardProps {
  author: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  date: string;
  comment: string;
  images: string[];
  likes: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  rating,
  date,
  comment,
  images,
  likes,
}) => {
  return (
    <div className="border-t border-gray-200 py-6">
      <div className="flex items-start space-x-4">
        {/* eslint-disable-next-line */}
        <img
          src={author.avatarUrl}
          alt={author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm">{author.name}</p>
          <div className="my-1">
            <StarRatingDetail rating={rating} />
          </div>
          <p className="text-xs text-gray-500">{date}</p>

          <p className="mt-4 text-sm text-gray-800 leading-relaxed">
            {comment}
          </p>

          <div className="mt-4 flex w-20 h-20 gap-1">
            {images.map((src, index) => (
              <div key={index} className="relative aspect-square">
                {/* eslint-disable-next-line */}
                <img
                  src={src}
                  alt={`Review image ${index + 1}`}
                  className="absolute w-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center text-gray-500 gap-1">
            <Heart className="w-4 h-4"/>
            <span className="text-sm font-medium">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
