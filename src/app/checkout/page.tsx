"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { LockIcon, StoreIcon, TruckIcon } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { IAddresses } from "@/interfaces/addressInterface";
import { getCookie } from "cookies-next";
import axios from "axios";
import { apiUrl, midtransClientKey } from "@/config";
import AddressListModal from "@/components/checkout/addressListModal";
import AddressFormModal from "@/components/checkout/addressFormModal";

// --- MAIN PAGE COMPONENT ---
const CheckoutPage: NextPage = () => {
  const { user } = useAuthStore();
  const { cart } = useCartStore();

  
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");

  // State Management
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddresses | null>(
    null
  );
  const [shippingCost, setShippingCost] = useState(0);
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddresses | null>(null);

  // Initial data loading
  useEffect(() => {
    try {
      const fetchUserAddresses = async () => {
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
        const mainAddresses = data.data.filter(
          (address: IAddresses) => address.isDefault
        );
        setSelectedAddress(mainAddresses[0]);
      };
      fetchUserAddresses();
    } catch (err) {
      alert("Error loading user addresses.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user]); // Run only once on mount

  // Effect to update shipping cost based on delivery method or address change
  useEffect(() => {
    try {
      const calculateShipping = async () => {
        if (deliveryMethod === "PICKUP") {
          setShippingCost(0);
          return;
        }

        if (cart && selectedAddress) {
          const token = getCookie("access_token") as string;
          if (!token) {
            throw new Error("No access token found");
          }
          const { data } = await axios.get(
            `${apiUrl}/api/shipping-cost/${selectedAddress.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setShippingCost(data.shippingCost);
        }
      };
      calculateShipping();
    } catch (err) {
      alert("error calculating shipping cost.");
      console.error(err);
    }
  }, [deliveryMethod, selectedAddress,cart]);

  //midtrans
  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", String(midtransClientKey));
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
  }, []);

  const handleAddressSubmit = (values: IAddresses) => {
    if (editingAddress) {
      // Edit address
      const updatedAddresses = addresses.map((addr) =>
        addr.id === values.id ? values : addr
      );
      setAddresses(updatedAddresses);
      // If the edited address is the selected one, update it
      if (selectedAddress?.id === values.id) {
        setSelectedAddress(values);
      }
      console.log("Updating address:", values);
    } else {
      // Add new address
      const newAddress = { ...values, id: Date.now().toString() };
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      setSelectedAddress(newAddress); // Automatically select the new address
      console.log("Adding new address:", newAddress);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const token = getCookie("access_token") as string;
      if (!token) {
        throw new Error("No access token found");
      }
      const orderData = {
        userId: user.id,
        fullfillmentType: deliveryMethod,
        addressId: selectedAddress?.id,
        totalCheckoutPrice: total,
      };
      const response = await axios.post(`${apiUrl}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paymentToken = response.data.order.paymentToken;

      window.snap?.pay(paymentToken);
    } catch (err) {
      alert("Error checking out");
      console.log("Error checking out:", err);
    }
  };

  const openAddForm = () => {
    setEditingAddress(null);
    setListModalOpen(false);
    setFormModalOpen(true);
  };
  
  const openEditForm = (address: IAddresses) => {
    setEditingAddress(address);
    setListModalOpen(false);
    setFormModalOpen(true);
  };
  
  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal ? subtotal * 0.11 : 0;
  const total = subtotal ? subtotal + shippingCost + tax : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-slate-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Verifying your cart...
          </h2>
        </div>
      </div>
    );
  }

  if (cart?.items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            No Items To Checkout
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Checkout
            </h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Contact Information
                    </h3>
                    <div className="mt-4 rounded-md border border-gray-200 p-4">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delivery Method
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label
                        htmlFor="delivery"
                        className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                          deliveryMethod === "DELIVERY"
                            ? "ring-slate-600 border-slate-600"
                            : "ring-transparent border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery-method"
                          value="DELIVERY"
                          id="delivery"
                          className="sr-only"
                          checked={deliveryMethod === "DELIVERY"}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                        />
                        <div className="flex flex-1">
                          <div className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">
                              Delivery
                            </span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              4-10 business days
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">
                              Variable
                            </span>
                          </div>
                        </div>
                        <TruckIcon />
                      </label>
                      <label
                        htmlFor="pickup"
                        className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                          deliveryMethod === "PICKUP"
                            ? "ring-slate-600 border-slate-600"
                            : "ring-transparent border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery-method"
                          value="PICKUP"
                          id="pickup"
                          className="sr-only"
                          checked={deliveryMethod === "PICKUP"}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                        />
                        <div className="flex flex-1">
                          <div className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">
                              Pickup
                            </span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              Pick up from store
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">
                              Free
                            </span>
                          </div>
                        </div>
                        <StoreIcon />
                      </label>
                    </div>
                  </div>

                  {deliveryMethod === "DELIVERY" && (
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shipping Address
                        </h3>
                        <button
                          onClick={() => setListModalOpen(true)}
                          className="text-sm font-medium text-slate-600 hover:text-slate-800"
                        >
                          Change
                        </button>
                      </div>
                      {selectedAddress ? (
                        <div className="mt-4 rounded-md border border-gray-200 p-4 text-sm text-gray-600">
                          <p>{selectedAddress.street}</p>
                          <p>
                            {selectedAddress.subdistrict},{" "}
                            {selectedAddress.district}, {selectedAddress.city}{" "}
                            {selectedAddress.postalCode}
                          </p>
                          <p>{selectedAddress.province}</p>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-md border border-gray-200 p-4 text-sm text-gray-600">
                          <p>Please select a shipping address.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>
                <ul role="list" className="mt-6 divide-y divide-gray-200">
                  {cart?.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="flex-shrink-0">
                        {/* eslint-disable-next-line */}
                        <img
                          src={item.product.imageUrl}
                          alt={`Image of ${item.product.name}`}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Weight: {item.product.weightInKg} kg
                          </p>
                        </div>
                        <div className="flex items-end justify-between text-sm">
                          <p className="text-gray-700">Qty {item.quantity}</p>
                          <p className="font-medium text-gray-900">
                            Rp{" "}
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("id-ID", {
                              minimumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Rp{" "}
                      {subtotal?.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Rp{" "}
                      {shippingCost.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Rp{" "}
                      {tax.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      Rp{" "}
                      {total.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={handleConfirmOrder}
                    className="w-full rounded-md border border-transparent bg-slate-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <LockIcon className="text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Secure payment via Stripe
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* --- MODAL PORTALS --- */}
      <AddressListModal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        addresses={addresses}
        onSelect={setSelectedAddress}
        onAddNew={openAddForm}
        onEdit={openEditForm}
      />
      <AddressFormModal
        isOpen={isFormModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleAddressSubmit}
        initialValues={editingAddress}
      />
    </>
  );
};

export default CheckoutPage;
