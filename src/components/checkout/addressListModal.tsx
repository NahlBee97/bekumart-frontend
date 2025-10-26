"use client"

import { IAddress } from "@/interfaces/dataInterfaces";
import { useEffect, useState } from "react";
import { CommonButton } from "../buttons/commonButton";
import { XIcon } from "lucide-react";
import { TinyCommonButton } from "../buttons/tinyCommonButton";

export const AddressListModal = ({
  isOpen,
  onClose,
  addresses,
  onSelect,
  onAddNew,
  onEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddNew: () => void;
  onEdit: (address: IAddress) => void;
}) => {
  const [show, setShow] = useState<boolean>(false);

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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
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
              <h3 className="font-semibold">{address.receiver}</h3>
              <p>
                {address.street}, {address.subdistrict}, {address.district}{" "}
                {address.city}
              </p>
              <p>{address.province}</p>
              <p>{address.phone}</p>
              <div className="mt-4 flex gap-2">
                <TinyCommonButton
                  isPositive={true}
                  buttonText="Gunakan"
                  onClick={() => {
                    onSelect(address);
                    onClose();
                  }}
                />
                <TinyCommonButton
                  isPositive={false}
                  buttonText="Edit"
                  onClick={() => onEdit(address)}
                />
              </div>
            </div>
          ))}
        </div>
        <CommonButton
          onClick={onAddNew}
          isDisable={false}
          buttonText="Tambah Alamat"
        />
      </div>
    </div>
  );
};

