import {
  IAddress,
  ICart,
  ICartItem,
  IProductPhoto,
} from "@/interfaces/dataInterfaces";
import { OrderSummarySkeleton } from "../skeletons/checkout/orderSummarySkeleton";

interface OrderSummaryProps {
  isLoading: boolean;
  cart: ICart | null;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isCalculating: boolean;
  isSubmitting: boolean;
  onConfirmOrder: () => void;
  deliveryMethod: string;
  selectedAddress?: IAddress;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  isLoading,
  cart,
  subtotal,
  shippingCost,
  tax,
  total,
  isCalculating,
  isSubmitting,
  onConfirmOrder,
  deliveryMethod,
  selectedAddress,
}) => {
  const isConfirmDisabled =
    isSubmitting || (deliveryMethod === "DELIVERY" && !selectedAddress);

  if (isLoading) return <OrderSummarySkeleton />;

  return (
    <section className="mt-8 border bg-white rounded-lg border-gray-300 shadow-sm px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-xl font-semibold text-blue-500">Ringkasan Belanja</h2>
      <ul role="list" className="mt-6 divide-y divide-gray-200">
        {cart?.items.map((item: ICartItem) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <OrderBreakdown
        subtotal={subtotal}
        shippingCost={shippingCost}
        tax={tax}
        total={total}
        isCalculating={isCalculating}
      />
      <div className="mt-4">
        <button
          type="button"
          onClick={onConfirmOrder}
          disabled={isConfirmDisabled}
          className={`w-full flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isConfirmDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            "Konfirmasi Pembelanjaan"
          )}
        </button>
      </div>
    </section>
  );
};

const CartItem = ({ item }: { item: ICartItem }) => {
  const defaultImage = item.product.productPhotos.find(
    (photo: IProductPhoto) => photo.isDefault
  )?.imageUrl;

  return (
    <li className="flex py-6">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line */}
        <img
          src={defaultImage}
          alt={`Image of ${item.product.name}`}
          className="h-24 w-24 rounded-md border border-gray-300 object-cover object-center sm:h-32 sm:w-32"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">
            {item.product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Berat: {item.product.weightInKg} kg
          </p>
        </div>
        <div className="flex items-end justify-between text-sm">
          <p className="text-gray-700">Jumlah {item.quantity}</p>
          <p className="font-medium text-gray-900">
            Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </li>
  );
};

interface OrderBreakdownProps {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  isCalculating: boolean;
}

const OrderBreakdown: React.FC<OrderBreakdownProps> = ({
  subtotal,
  shippingCost,
  tax,
  total,
  isCalculating,
}) => (
  <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
    <SummaryRow
      label="Subtotal"
      value={`Rp ${subtotal.toLocaleString("id-ID")}`}
    />
    <SummaryRow
      label="Pengiriman"
      value={
        isCalculating ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        ) : shippingCost > 0 ? (
          `Rp ${shippingCost.toLocaleString("id-ID")}`
        ) : (
          "Gratis"
        )
      }
    />
    <SummaryRow label="PPN 11%" value={`Rp ${tax.toLocaleString("id-ID")}`} />
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <dt className="text-base font-semibold text-gray-900">Total Belanja</dt>
      <dd className="text-xl font-semibold text-blue-500">
        Rp {total.toLocaleString("id-ID", { minimumFractionDigits: 0 })}
      </dd>
    </div>
  </dl>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <dt className="text-sm text-gray-600">{label}</dt>
    <dd className="text-sm font-medium text-gray-900">{value}</dd>
  </div>
);
