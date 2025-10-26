import { IOrder } from "@/interfaces/dataInterfaces";

const statusLabels: { [key: string]: string } = {
  PENDING: "Menunggu",
  PROCESSING: "Dalam Proses",
  READY_FOR_PICKUP: "Siap Diambil",
  OUT_FOR_DELIVERY: "Dalam Pengiriman",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

// A component to render the status badge with appropriate colors
export const StatusBadge: React.FC<{ status: IOrder["status"] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs md:text-sm font-medium rounded-md";
  const statusClasses = {
    PENDING: "bg-yellow-100 text-orange-800",
    PROCESSING: "bg-yellow-100 text-yellow-800",
    OUT_FOR_DELIVERY: "bg-blue-100 text-blue-800",
    READY_FOR_PICKUP: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{statusLabels[status]}</span>
  );
};

