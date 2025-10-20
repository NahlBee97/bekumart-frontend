import { useRouter, useSearchParams } from "next/navigation";
import { StarIcon } from "../products/starRating";

export const RatingFilter: React.FC = () => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const active = Number(queryParams.get("rating"));

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={i < rating} />);
    }
    return stars;
  };

  const handleClick = (rating: number) => {
    const params = new URLSearchParams(queryParams.toString());

    if (rating) params.set("rating", rating.toString());
    else params.delete("rating");

    // Navigate with new params
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="w-50 max-w-sm border-t pt-2">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Penilaian</h2>
      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map((rating) => {
          return (
            <div
              key={rating}
              onClick={() => handleClick(rating)}
              className={`flex p-1 items-center space-x-2 cursor-pointer rounded-sm ${
                active === rating && "bg-blue-300"
              }`}
            >
              {renderStars(rating)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
