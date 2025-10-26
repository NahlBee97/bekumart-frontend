export const statusColors: { [key: string]: string } = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  READY_FOR_PICKUP: "bg-indigo-100 text-indigo-800",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
};

export const statusLabels: { [key: string]: string } = {
  PENDING: "Menunggu",
  PROCESSING: "Dalam Proses",
  READY_FOR_PICKUP: "Siap Diambil",
  OUT_FOR_DELIVERY: "Dalam Pengiriman",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const statusOptions = [
    { label: "Menunggu", value: "PENDING" },
    { label: "Dalam Proses", value: "PROCESSING" },
    { label: "Siap Diambil", value: "READY_FOR_PICKUP" },
    { label: "Dalam Pengiriman", value: "OUT_FOR_DELIVERY" },
    { label: "Selesai", value: "COMPLETED" },
    { label: "Dibatalkan", value: "CANCELLED" },
  ];
