import { statusLabels } from "@/helper/variable";
import { IOrder } from "@/interfaces/dataInterfaces";

// A component to render the status badge with appropriate colors
export const StatusBadge: React.FC<{ status: IOrder["status"] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs md:text-sm font-medium rounded-full";
  const statusClasses = {
    PENDING: "bg-yellow-100 text-orange-800",
    PROCESSING: "bg-yellow-100 text-yellow-800",
    OUT_FOR_DELIVERY: "bg-frost-light text-frost-deep",
    READY_FOR_PICKUP: "bg-frost-light text-frost-deep",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{statusLabels[status]}</span>
  );
};

