import { FulfillmentTypes } from "@/interfaces/enums";

interface props {
  id: string;
  value: FulfillmentTypes;
  label: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onChange: (value: FulfillmentTypes) => void;
}

export const DeliveryOption = ({
  id,
  value,
  label,
  description,
  price,
  icon,
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
      name="delivery-method"
      value={value}
      id={id}
      className="sr-only"
      checked={isSelected}
      onChange={(e) => onChange(e.target.value as FulfillmentTypes)}
    />
    <div className="flex flex-1">
      <div className="flex flex-col">
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-1 flex items-center text-sm text-fog">
          {description}
        </span>
        <span className="mt-6 text-sm font-mono font-medium text-ink">{price}</span>
      </div>
    </div>
    {icon}
  </label>
);
