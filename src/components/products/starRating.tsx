// This component displays a star icon and the numerical rating.
export const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.05 9.383c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

// --- HELPER COMPONENT ---
// A simple component to render star ratings.
const StarRatingDetail = ({ rating }: { rating: number }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={i < rating} />);
    }
    return stars;
  };

  return (
    <div
      className="flex items-center cursor-pointer"
    >
      <span className="text-sm mr-1 font-semibold">{rating}</span>
      {renderStars(rating)}
    </div>
  );
};

export { StarRatingDetail };
