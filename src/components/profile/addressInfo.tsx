"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Trash2, Edit3, PlusCircle } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import AddressModal from "./addressModal";
import { getUserAddresses } from "@/lib/data";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import ConfirmModal from "../confirmModal";
import AddressInfoSkeleton from "./addressInfoSkeleton";
import { IAddress } from "@/interfaces/dataInterfaces";

// --- Main Component ---
export default function AddressInfo() {
  const { user, isLoading } = useAuthStore();
  // --- State Management ---
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<IAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<IAddress | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const refreshAddresess = useCallback(async () => {
    if (isLoading) return;

    try {
      const addresses = await getUserAddresses(user.id);
      setAddresses(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error; // Re-throw to be caught by the caller
    }
  }, [user?.id, isLoading]);

  useEffect(() => {
    refreshAddresess();
  }, [refreshAddresess]);

  // --- Event Handlers ---
  const confirmDeleteAddress = async (address: IAddress) => {
    try {
      if (address.isDefault === true) {
        toast.error("Tidak dapat menghapus alamat utama.");
        return;
      }
      await api.delete(`/api/addresses/${address?.id}`);
      refreshAddresess();
      toast.success("Alamat Berhasil Dihapus");
    } catch (error) {
      toast.error("Gagal Menghapus Alamat");
      console.error(error);
    } finally {
      setAddressToDelete(null);
      setIsDeleting(false);
    }
  };

  const confirmSetDefault = async (address: IAddress) => {
    try {
      await api.patch(`/api/addresses/${address?.id}`, { isDefault: true });
      refreshAddresess();
      toast.success("Berhasil Mengatur Alamat Utama");
    } catch (error) {
      toast.error("Gagal Mengatur Alamat Utama");
      console.error(error);
    } finally {
      setAddressToDelete(null);
    }
  };

  if (isLoading) return <AddressInfoSkeleton/>;

  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="md:text-xl font-semibold text-blue-500">
              {user.role === "CUSTOMER" ? "Alamat Pengiriman" : "Alamat Toko"}
            </h2>
          </div>
          {user.role === "CUSTOMER" && (
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
          )}
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
                        onClick={() => {
                          setAddressToDelete(address);
                          setIsConfirmModalOpen(true);
                        }}
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
                      onClick={() => {
                        setAddressToDelete(address);
                        setIsDeleting(true);
                        setIsConfirmModalOpen(true);
                      }}
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() =>
          isDeleting
            ? confirmDeleteAddress(addressToDelete as IAddress)
            : confirmSetDefault(addressToDelete as IAddress)
        }
        title={isDeleting ? "Hapus Alamat?" : "Atur Sebagai Alamat Utama"}
        confirmText={isDeleting ? "Hapus" : "Konfirmasi"}
      />
    </div>
  );
}
