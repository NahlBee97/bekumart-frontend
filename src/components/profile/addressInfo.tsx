"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Trash2, Edit3, PlusCircle } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import axios from "axios";
import { apiUrl } from "@/config";
import { getCookie } from "cookies-next";
import { IAddresses } from "@/interfaces/addressInterface";
import AddAddressModal from "./addAddressModal";

// --- Main Component ---
export default function AddressInfo() {
  const { user } = useAuthStore();
  // --- State Management ---
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<IAddresses | null>(null);

  const fetchUserAddresses = useCallback(async () => {
    const token = getCookie("access_token") as string;
    if (!token) {
      throw new Error("No access token found");
    }
    const { data } = await axios.get(`${apiUrl}/api/addresses/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAddresses(data.data);
  }, [user]);

  useEffect(() => {
    try {
      fetchUserAddresses();
    } catch (err) {
      alert("Error loading user addresses.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchUserAddresses]); // Run only once on mount

  // --- Event Handlers ---
  const handleDeleteAddress = async (id: string) => {
    try {
      const token = getCookie("access_token") as string;
      await axios.delete(`${apiUrl}/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserAddresses();
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
      fetchUserAddresses();
      alert("success set default address");
    } catch (error) {
      alert("Error setting default address.");
      console.error(error);
    }
  };

  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-4 animate-pulse"
        >
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Shipping Addresses
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your saved addresses for faster checkout.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircle className="h-5 w-5" />
            Add New Address
          </button>
        </div>
        <div className="mt-6 flow-root">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {addresses.map((address) => (
                <li key={address.id} className="py-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {address.street}, {address.city}
                        </p>
                        <p className="text-gray-500">
                          {address.city}, {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      {address.isDefault && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Default
                        </span>
                      )}
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        className="p-1 text-gray-500 hover:text-indigo-600"
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
          )}
        </div>
      </div>
      <AddAddressModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        onAdd={() => fetchUserAddresses()}
        address={addressToEdit}
      />
    </div>
  );
}
