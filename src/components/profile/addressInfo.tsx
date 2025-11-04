"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { AddressModal } from "./addressModal";
import { getUserAddresses } from "@/lib/data";

import { ConfirmModal } from "../confirmModal";
import { AddressInfoSkeleton } from "../skeletons/profile/addressInfoSkeleton";
import { IAddress } from "@/interfaces/dataInterfaces";
import { AddressCard } from "./addressCard";
import { LoadingModal } from "../loadingModal";

// --- Main Component ---
export default function AddressInfo() {
  const { user, isAuthLoading, accessToken } = useAuthStore();
  // --- State Management ---
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<IAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<IAddress | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const refreshAddresess = useCallback(async () => {
    if (isAuthLoading || !accessToken) return;

    try {
      const addresses = await getUserAddresses(user.id);
      setAddresses(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error; // Re-throw to be caught by the caller
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isAuthLoading, accessToken]);

  useEffect(() => {
    refreshAddresess();
  }, [refreshAddresess]);

  // --- Event Handlers ---
  const confirmDeleteAddress = async (address: IAddress) => {
    try {
      setIsProcessing(true);
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
      setIsProcessing(false);
      setIsDeleting(false);
    }
  };

  const confirmSetDefault = async (address: IAddress) => {
    try {
      setIsProcessing(true);
      await api.patch(`/api/addresses/${address?.id}`, {});
      refreshAddresess();
      toast.success("Berhasil Mengatur Alamat Utama");
    } catch (error) {
      toast.error("Gagal Mengatur Alamat Utama");
      console.error(error);
    } finally {
      setIsProcessing(false);
      setAddressToDelete(null);
    }
  };

  if (isLoading) return <AddressInfoSkeleton />;

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
                <AddressCard
                  address={address}
                  onClickSetMain={() => {
                    setAddressToDelete(address);
                    setIsConfirmModalOpen(true);
                  }}
                  onClickEdit={() => {
                    setAddressToEdit(address);
                    setIsModalOpen(true);
                  }}
                  onClickDelete={() => {
                    setIsDeleting(true);
                    setAddressToDelete(address);
                    setIsConfirmModalOpen(true);
                  }}
                />
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
      <LoadingModal isOpen={isProcessing} title={isDeleting ? "Sedang Menghapus" : "Sedang Mengatur Alamat Utama"}/>
    </div>
  );
}
