"use client";

import { useState, useCallback } from "react";
import { MapPin, Trash2, Edit3, PlusCircle } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";
import { IAddresses } from "@/interfaces/addressInterface";
import AddressModal from "./addressModal";

// --- Main Component ---
export default function AddressInfo({
  initialAddresess,
}: {
  initialAddresess: IAddresses[];
}) {
  const { user } = useAuthStore();
  // --- State Management ---
  const [addresses, setAddresses] = useState<IAddresses[]>(initialAddresess);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<IAddresses | null>(null);

  const refreshAddresess = useCallback(async () => {
    const token = getCookie("access_token") as string;
    if (!token) {
      throw new Error("No access token found");
    }
    try {
      if (!user?.id) {
        return;
      }
      const { data } = await axios.get(`${apiUrl}/api/addresses/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error; // Re-throw to be caught by the caller
    }
  }, [user?.id]);

  // --- Event Handlers ---
  const handleDeleteAddress = async (id: string) => {
    try {
      confirm("apakah kamu yakin ingin menghapus alamat ini?");
      const token = getCookie("access_token") as string;
      const mainAddress = addresses.find(
        (address) => address.isDefault === true
      );
      if (mainAddress) {
        alert("Tidak dapat menghapus alamat utama.");
        return;
      }
      await axios.delete(`${apiUrl}/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refreshAddresess();
      alert("success deleting address");
    } catch (error) {
      alert("Error deleting address.");
      console.error(error);
    }
  };

  const handleSetDefault = async (id: string) => {
    const token = getCookie("access_token") as string;
    console.log(token);
    try {
      await axios.patch(
        `${apiUrl}/api/addresses/${id}`,
        { isDefault: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshAddresess();
      alert("success set default address");
    } catch (error) {
      alert("Error setting default address.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="md:text-xl font-semibold text-blue-500">
              Alamat Pengiriman
            </h2>
          </div>
          <button
            onClick={() => {
              setAddressToEdit(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle className="h-5 w-5" />
            Tambahkan Alamat Baru
          </button>
        </div>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {addresses.map((address) => (
              <li key={address.id} className="py-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {address.street}
                      </p>
                      <p className="text-gray-500">
                        {address.subdistrict}, {address.district},{" "}
                        {address.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    {address.isDefault && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Utama
                      </span>
                    )}
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Jadikan Alamat Utama
                      </button>
                    )}
                    <button
                      className="p-1 text-gray-500 hover:text-blue-600"
                      onClick={() => {
                        setAddressToEdit(address);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddressModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        onSave={() => refreshAddresess()}
        address={addressToEdit}
      />
    </div>
  );
}
