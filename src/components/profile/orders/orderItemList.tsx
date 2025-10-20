import { IOrderItem, IReview } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { useCallback, useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { getProductReviewsByUserId } from "@/lib/data";
import { StarRatingDetail } from "@/components/products/starRating";
import RatingModal from "./ratingModal";

interface OrderItemListProps {
  items: IOrderItem[];
  orderStatus: OrderStatuses;
}

const OrderItemList: React.FC<OrderItemListProps> = ({
  items,
  orderStatus,
}) => {
  const { user, isLoading } = useAuthStore();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [userReviews, setUserReviews] = useState<IReview[]>([]);
  const [itemToRate, setItemToRate] = useState<IOrderItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  // Pagination logic
  const indexOfLastItems = currentPage * itemPerPage;
  const indexOfFirstReviews = indexOfLastItems - itemPerPage;
  const currentItems = items.slice(indexOfFirstReviews, indexOfLastItems);

  const totalPages = Math.ceil(
    items.length /
      itemPerPage
  );

  const refreshUserReviews = useCallback(async () => {
    if (isLoading) return;
    const reviews = await getProductReviewsByUserId(user.id);
    setUserReviews(reviews);
  }, [user, isLoading]);

  useEffect(() => {
    refreshUserReviews();
  }, [refreshUserReviews]);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm md:text-base text-gray-800">
        Daftar Pesanan:
      </h4>
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {currentItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4 py-4">
              {/* eslint-disable-next-line */}
              <img
                src={
                  item.product.productPhotos.find((p) => p.isDefault)?.imageUrl
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
              {!userReviews.find(
                (review) => review.productId === item.productId
              ) && orderStatus === "COMPLETED" ? (
                <button
                  className="w-40 flex items-center justify-center rounded-md border border-transparent bg-yellow-500 px-1 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-300"
                  onClick={() => {
                    setItemToRate(item);
                    setIsRatingModalOpen(true);
                  }}
                >
                  Beri Rating
                </button>
              ) : (
                <StarRatingDetail
                  rating={
                    userReviews.find(
                      (review) => review.productId === item.productId
                    )?.rating as number
                  }
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-slate-700 dark:text-slate-400">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Berikutnya
          </button>
        </div>
      )}

      <RatingModal
        productId={itemToRate?.productId as string}
        isOpen={isRatingModalOpen}
        onSubmitSuccess={() => refreshUserReviews()}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </div>
  );
};

export default OrderItemList;
