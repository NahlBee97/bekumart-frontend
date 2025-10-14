interface PaymentMethodSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: "ONLINE" | "INSTORE") => void;
}

interface PaymentOptionProps {
  id: string;
  value: "ONLINE" | "INSTORE";
  label: string;
  isSelected: boolean;
  onChange: (value: "ONLINE" | "INSTORE") => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  id,
  value,
  label,
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
      name="payment-method"
      value={value}
      id={id}
      className="sr-only"
      checked={isSelected}
      onChange={(e) => onChange(e.target.value as "ONLINE" | "INSTORE")}
    />
    <div className="flex flex-1">
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-gray-900">{label}</span>
      </div>
    </div>
  </label>
);

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
}) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">Metode Pembayaran</h3>
    <div className="mt-4 grid gap-4 grid-cols-2">
      <PaymentOption
        id="online"
        value="ONLINE"
        label="Online"
        isSelected={paymentMethod === "ONLINE"}
        onChange={onPaymentMethodChange}
      />
      <PaymentOption
        id="instore"
        value="INSTORE"
        label="Di Toko"
        isSelected={paymentMethod === "INSTORE"}
        onChange={onPaymentMethodChange}
      />
    </div>
  </div>
);
