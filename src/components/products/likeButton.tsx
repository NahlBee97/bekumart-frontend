import { useAuthStore } from "@/stores/useAuthStore";

export const LikeButton = ({
  hasLiked,
  onClick,
}: {
  hasLiked: boolean;
  onClick: () => void;
}) => {
const {accessToken} = useAuthStore()    
  return (
    <button
      onClick={onClick}
      disabled={accessToken === null}
      className="focus:outline-none transform transition-transform duration-150 ease-in-out active:scale-125"
      aria-label={hasLiked ? "Unlike post" : "Like post"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // Dynamically change text color based on the liked state
        className={`w-6 h-6 cursor-pointer ${
          hasLiked ? "text-red-500" : "text-gray-400 hover:text-gray-300"
        }`}
        // The `fill` property is the key to making it solid or outlined
        fill={hasLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  );
};
