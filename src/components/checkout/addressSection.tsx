import { IAddress, ICourier } from "@/interfaces/dataInterfaces";

import { AddressSectionSkeleton } from "../skeletons/checkout/addressSectionSkeleton";
import { Couriers } from "./couriers";

interface props {
  isLoading: boolean;
  selectedAddress?: IAddress;
  couriers: ICourier[];
  onCourierChange: (courier: ICourier) => void;
  onEditAddress: () => void;
}

export const AddressSection = ({
  isLoading,
  selectedAddress,
  couriers,
  onCourierChange,
  onEditAddress,
}: props) => {

  const handleCourierChange = (courier: ICourier) => {
    onCourierChange(courier);
  };

  if (isLoading) return <AddressSectionSkeleton />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">
          Alamat Pengiriman
        </h3>
        <button
          onClick={onEditAddress}
          className="flex-shrink-0 flex items-center gap-2 bg-frost text-white text-sm font-semibold py-1 px-4 rounded-full shadow-sm hover:bg-frost-deep hover:shadow-md active:scale-95 transition-all"
        >
          Ganti
        </button>
      </div>
      {selectedAddress ? (
        <div className="mt-4 rounded-xl bg-mist p-4 text-sm text-fog">
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
            <Couriers
              couriers={couriers}
              onCourierChange={handleCourierChange}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-mist p-4 text-sm text-fog">
          <p>Pilih Alamat Pengiriman.</p>
        </div>
      )}
    </div>
  );
};
