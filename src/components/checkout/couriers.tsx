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
        className="block text-sm font-medium text-fog"
      >
        Pilihan Kurir:
      </label>
      <select
        id="courier"
        onChange={(e) => {
          const selectedCourier = couriers[parseInt(e.target.value)];
          onCourierChange(selectedCourier);
        }}
        className="mt-1 p-2 block w-full border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-frost focus:border-frost outline-none disabled:bg-slate-100 transition-shadow"
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
