import { StoreIcon, TruckIcon } from "lucide-react";
import { FulfillmentTypes } from "@/interfaces/enums";

import { DeliveryMethodSectionSkeleton } from "../skeletons/checkout/deliveryMethodSectionSkeleton";
import { DeliveryOption } from "./deliveryOption";

interface props {
  isLoading: boolean;
  deliveryMethod: string;
  onDeliveryMethodChange: (method: FulfillmentTypes) => void;
}

export const DeliveryMethodSection = ({
  isLoading,
  deliveryMethod,
  onDeliveryMethodChange,
}: props) => {
  if (isLoading) return <DeliveryMethodSectionSkeleton />;

  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-500">Metode Pelayanan</h3>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <DeliveryOption
          id="delivery"
          value={FulfillmentTypes["DELIVERY"]}
          label="Delivery"
          description="15-30 menit Tergantung Jarak"
          price="Bervariasi"
          icon={<TruckIcon />}
          isSelected={deliveryMethod === "DELIVERY"}
          onChange={onDeliveryMethodChange}
        />
        <DeliveryOption
          id="pickup"
          value={FulfillmentTypes["PICKUP"]}
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
