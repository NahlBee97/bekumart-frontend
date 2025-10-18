import { useRouter, useSearchParams } from "next/navigation";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.05 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

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
