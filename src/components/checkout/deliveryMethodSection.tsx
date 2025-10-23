import { StoreIcon, TruckIcon } from "lucide-react";
import { DeliveryMethodSectionSkeleton } from "../skeletons/checkout/deliveryMethodSectionSkeleton";

interface DeliveryMethodSectionProps {
  isLoading: boolean;
  deliveryMethod: string;
  onDeliveryMethodChange: (method: "DELIVERY" | "PICKUP") => void;
}

interface DeliveryOptionProps {
  id: string;
  value: "DELIVERY" | "PICKUP";
  label: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onChange: (value: "DELIVERY" | "PICKUP") => void;
}

const DeliveryOption: React.FC<DeliveryOptionProps> = ({
  id,
  value,
  label,
  description,
  price,
  icon,
  isSelected,
  onChange,
}) => (
  <label
    htmlFor={id}
    className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
      isSelected
        ? "ring-blue-500 border-blue-500"
        : "ring-transparent border-gray-300"
    }`}
  >
    <input
      type="radio"
      name="delivery-method"
      value={value}
      id={id}
      className="sr-only"
      checked={isSelected}
      onChange={(e) => onChange(e.target.value as "DELIVERY" | "PICKUP")}
    />
    <div className="flex flex-1">
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="mt-1 flex items-center text-sm text-gray-500">
          {description}
        </span>
        <span className="mt-6 text-sm font-medium text-gray-900">{price}</span>
      </div>
    </div>
    {icon}
  </label>
);

export const DeliveryMethodSection: React.FC<DeliveryMethodSectionProps> = ({
  isLoading,
  deliveryMethod,
  onDeliveryMethodChange,
}) => {
  if (isLoading) return <DeliveryMethodSectionSkeleton />;

  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-500">Metode Pelayanan</h3>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <DeliveryOption
          id="delivery"
          value="DELIVERY"
          label="Delivery"
          description="15-30 menit Tergantung Jarak"
          price="Bervariasi"
          icon={<TruckIcon />}
          isSelected={deliveryMethod === "DELIVERY"}
          onChange={onDeliveryMethodChange}
        />
        <DeliveryOption
          id="pickup"
          value="PICKUP"
          label="Pickup"
          description="Langsung ambil di toko"
          price="Gratis"
          icon={<StoreIcon />}
          isSelected={deliveryMethod === "PICKUP"}
          onChange={onDeliveryMethodChange}
        />
      </div>
    </div>
  );
};
