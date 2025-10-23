import { IAddress } from "@/interfaces/dataInterfaces";
import { AddressSectionSkeleton } from "../skeletons/checkout/addressSectionSkeleton";

interface AddressSectionProps {
  isLoading: boolean;
  selectedAddress?: IAddress;
  couriers: any[];
  onCourierChange: (courier: any) => void;
  onEditAddress: () => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  isLoading,
  selectedAddress,
  couriers,
  onCourierChange,
  onEditAddress,
}) => {
  const handleCourierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courierIndex = Number(event.target.value);
    const courier = couriers[courierIndex];
    console.log(courier);
    onCourierChange(courier);
  };

  if (isLoading) return <AddressSectionSkeleton />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-500">
          Alamat Pengiriman
        </h3>
        <button
          onClick={onEditAddress}
          className="flex-shrink-0 flex items-center gap-2 bg-blue-500 text-white text-sm font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-blue-600"
        >
          Ganti
        </button>
      </div>
      {selectedAddress ? (
        <div className="mt-4 rounded-md border border-gray-200 p-4 text-sm text-gray-600">
          <div>
            <p className="text-base font-semibold">
              {selectedAddress.receiver}
            </p>
            <p>{selectedAddress.street}</p>
            <p>
              {selectedAddress.subdistrict}, {selectedAddress.district},{" "}
              {selectedAddress.city} {selectedAddress.postalCode}
            </p>
            <p>{selectedAddress.province}</p>
          </div>
          <div className="mt-2">
            <label
              htmlFor="district"
              className="block text-sm font-semibold text-gray-700"
            >
              Pilihan Kurir:
            </label>
            <select
              id="courier"
              onChange={handleCourierChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              {couriers.map((c, index) => (
                <option key={index} value={index}>
                  {c.name}, Biaya Pengiriman: Rp{" "}
                  {c.cost.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-gray-200 p-4 text-sm text-gray-600">
          <p>Pilih Alamat Pengiriman.</p>
        </div>
      )}
    </div>
  );
};
