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
    className={`relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 ${
      isSelected
        ? "ring-2 ring-frost border-frost bg-frost-light/30"
        : "ring-0 border-slate-200 hover:border-frost/50"
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
        <span className="block text-sm font-medium text-ink">{label}</span>
      </div>
    </div>
  </label>
);
