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
      onChange={(e) => onChange(e.target.value as FulfillmentTypes)}
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
