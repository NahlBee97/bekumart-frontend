import { IOrder } from "@/interfaces/dataInterfaces";

interface ModalActionsProps {
  order: IOrder;
  isPaymentLoading: boolean;
  onProceedPayment: () => void;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  order,
  isPaymentLoading,
  onProceedPayment,
}) => {
  if (order.status !== "PENDING") {
    return null; // No actions if order is not pending
  }

  if (order.paymentMethod === "ONLINE") {
    return (
      <button
        disabled={isPaymentLoading}
        className="flex w-full text-sm items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-300 sm:w-auto"
        onClick={onProceedPayment}
      >
        {isPaymentLoading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          "Lanjutkan Pembayaran"
        )}
      </button>
    );
  }

  if (order.paymentMethod === "INSTORE") {
    return (
      <button className="text-sm text-white bg-red-500 px-4 py-2 font-semibold rounded-sm">
        Silahkan lanjutkan pembayaran di toko
      </button>
    );
  }

  return null;
};

export default ModalActions;
