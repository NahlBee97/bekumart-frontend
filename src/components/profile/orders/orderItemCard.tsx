import { StarRatingDetail } from "@/components/products/starRating";
import { IOrderItem, IProductPhoto, IReview } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";

interface props {
  item: IOrderItem;
  reviews: IReview[];
  status: OrderStatuses;
  onClickRate: () => void;
}

export const OrderItemCard = ({ item, reviews, status, onClickRate }: props) => {
  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        src={
          item.product.productPhotos.find(
            (photo: IProductPhoto) => photo.isDefault
          )?.imageUrl
        }
        alt={item.product.name}
        className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{item.product.name}</p>
        <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
      </div>
      <p className="font-semibold text-blue-500">
        Rp {(item.product.price * item.quantity).toLocaleString()}
      </p>
      {!reviews.some((review) => review.productId === item.productId) &&
      status === "COMPLETED" ? (
        <button
          className="w-40 flex items-center justify-center rounded-md border border-transparent bg-yellow-500 px-1 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-300"
          onClick={onClickRate}
        >
          Beri Rating
        </button>
      ) : (
        <StarRatingDetail
          rating={
            reviews.find((review) => review.productId === item.productId)
              ?.rating as number
          }
        />
      )}
    </>
  );
};
