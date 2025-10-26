import { PaymentMethod } from "@/interfaces/enums";

interface props {
  id: string;
  value: PaymentMethod;
  label: string;
  isSelected: boolean;
  onChange: (value: PaymentMethod) => void;
}

export const PaymentOption = ({
  id,
  value,
  label,
  isSelected,
  onChange,
}:props) => (
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
      onChange={(e) => onChange(e.target.value as PaymentMethod)}
    />
    <div className="flex flex-1">
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-gray-900">{label}</span>
      </div>
    </div>
  </label>
);
