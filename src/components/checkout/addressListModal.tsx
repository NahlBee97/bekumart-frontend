import { IAddresses } from "@/interfaces/addressInterface";
import { XIcon } from "lucide-react";

const AddressListModal = ({
  isOpen,
  onClose,
  addresses,
  onSelect,
  onAddNew,
  onEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  addresses: IAddresses[];
  onSelect: (address: IAddresses) => void;
  onAddNew: () => void;
  onEdit: (address: IAddresses) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <XIcon />
        </button>
        <h3 className="mb-6 text-xl font-semibold">Shipping Address</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {addresses.map((addr) => (
            <div key={addr.id} className="rounded-md border p-4">
              <p>
                {addr.street}, {addr.subdistrict}, {addr.district} {addr.city}
              </p>
              <p>{addr.province}</p>
              <p>{addr.phone}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    onSelect(addr);
                    onClose();
                  }}
                  className="rounded-md bg-slate-700 px-4 py-1 text-sm text-white hover:bg-slate-800"
                >
                  Use this address
                </button>
                <button
                  onClick={() => onEdit(addr)}
                  className="rounded-md border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onAddNew}
          className="mt-6 w-full rounded-md border border-slate-800 px-6 py-2 text-slate-800 hover:bg-slate-100"
        >
          Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressListModal;