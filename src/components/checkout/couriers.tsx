import { ICourier } from "@/interfaces/dataInterfaces";

interface props {
  couriers: ICourier[];
  onCourierChange: (courier: ICourier) => void;
}

export const Couriers = ({ couriers, onCourierChange }: props) => {
  return (
    <>
      <label
        htmlFor="district"
        className="block text-sm font-semibold text-gray-700"
      >
        Pilihan Kurir:
      </label>
      <select
        id="courier"
        onChange={(e) => {
          const selectedCourier = couriers[parseInt(e.target.value)];
          onCourierChange(selectedCourier);
        }}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      >
        {couriers.map((c, index) => (
          <option key={index} value={index}>
            {c.name}, Biaya Pengiriman: Rp {c.cost.toLocaleString("id-ID")}
          </option>
        ))}
      </select>
    </>
  );
};
