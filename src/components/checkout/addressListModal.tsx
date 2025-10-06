"use client"

import { IAddresses } from "@/interfaces/addressInterface";
import { PlusCircle, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
 // --- CHANGE 1: Add state and useEffect for the animation ---
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Use a tiny timeout to let the element render before starting the transition
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}>
      <div className={`relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <XIcon />
        </button>
        <h3 className="mb-6 text-xl text-blue-500 font-semibold">
          Pilih Alamat Pengiriman
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-md border p-4">
              <p>
                {address.street}, {address.subdistrict}, {address.district}{" "}
                {address.city}
              </p>
              <p>{address.province}</p>
              <p>{address.phone}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    onSelect(address);
                    onClose();
                  }}
                  className="rounded-md bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600"
                >
                  Gunakan
                </button>
                <button
                  onClick={() => onEdit(address)}
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
          className="mt-6 w-full rounded-md inline-flex items-center justify-center gap-2 border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle/> Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressListModal;
