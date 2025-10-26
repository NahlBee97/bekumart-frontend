import { PaymentMethod } from "@/interfaces/enums";
import { PaymentOption } from "./paymentOption";

interface props {
  paymentMethod: string;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}


export const PaymentMethodSection = ({
  paymentMethod,
  onPaymentMethodChange,
}: props) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">Metode Pembayaran</h3>
    <div className="mt-4 grid gap-4 grid-cols-2">
      <PaymentOption
        id="online"
        value={PaymentMethod["ONLINE"]}
        label="Online"
        isSelected={paymentMethod === "ONLINE"}
        onChange={onPaymentMethodChange}
      />
      <PaymentOption
        id="instore"
        value={PaymentMethod["INSTORE"]}
        label="Di Toko"
        isSelected={paymentMethod === "INSTORE"}
        onChange={onPaymentMethodChange}
      />
    </div>
  </div>
);
