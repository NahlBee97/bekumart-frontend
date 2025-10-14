import { IAddress } from "@/interfaces/addressInterface";

interface AddressSectionProps {
  selectedAddress?: IAddress;
  couriers: any[];
  onCourierChange: (courier: any) => void;
  onEditAddress: () => void;
}



export const AddressSection: React.FC<AddressSectionProps> = ({
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
  return (
  <div>
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Alamat Pengiriman</h3>
      <button
        onClick={onEditAddress}
        className="text-sm font-medium text-slate-600 hover:text-slate-800"
      >
        Ganti
      </button>
    </div>
    {selectedAddress ? (
      <div className="mt-4 rounded-md border border-gray-200 p-4 text-sm text-gray-600">
        <div>
          <p className="text-base font-semibold">{selectedAddress.receiver}</p>
          <p>{selectedAddress.street}</p>
          <p>
            {selectedAddress.subdistrict}, {selectedAddress.district},{" "}
            {selectedAddress.city} {selectedAddress.postalCode}
          </p>
          <p>{selectedAddress.province}</p>
        </div>
        <div className="mt-2">
          <select
            id="city"
            onChange={handleCourierChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Pilih Jasa Pengiriman</option>
            {couriers.map((c, index) => (
              <option key={index} value={index}>
                {c.name}, Biaya Pengiriman: Rp {c.cost.toLocaleString("id-ID")}
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
)};
