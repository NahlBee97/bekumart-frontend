import { IOrderItem, IReview } from "@/interfaces/dataInterfaces";
import { OrderStatuses } from "@/interfaces/enums";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProductReviewsByUserId } from "@/lib/data";

import { RatingModal } from "./ratingModal";
import { getTotalPages } from "@/helper/functions";
import { OrderItemCard } from "./orderItemCard";
import { Pagination } from "@/components/shop/pagination";

interface props {
  items: IOrderItem[];
  orderStatus: OrderStatuses;
}

export const OrderItemList = ({ items, orderStatus }: props) => {
  const { user, isAuthLoading } = useAuthStore();

  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [userReviews, setUserReviews] = useState<IReview[]>([]);
  const [itemToRate, setItemToRate] = useState<IOrderItem | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 5;

  const { totalPages, currentItems } = getTotalPages(
    items,
    currentPage,
    itemPerPage
  );

  const refreshUserReviews = useCallback(async () => {
    if (isAuthLoading) return;
    const reviews = await getProductReviewsByUserId(user.id);
    setUserReviews(reviews);
  }, [user, isAuthLoading]);

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
              <OrderItemCard
                item={item}
                reviews={userReviews}
                status={orderStatus}
                onClickRate={() => {
                  setItemToRate(item);
                  setIsRatingModalOpen(true);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <Pagination
            onClickPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onClickNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            currentPage={currentPage}
            totalPages={totalPages}
          />
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
