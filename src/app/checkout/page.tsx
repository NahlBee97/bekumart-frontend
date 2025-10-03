"use client";

import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import { StoreIcon, TruckIcon } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { IAddresses } from "@/interfaces/addressInterface";
import { getCookie } from "cookies-next";
import axios from "axios";
import { apiUrl, midtransClientKey } from "@/config";
import AddressListModal from "@/components/checkout/addressListModal";
import { useRouter } from "next/navigation";
import AddressCheckoutModal from "@/components/checkout/addressCheckoutModal";

// --- MAIN PAGE COMPONENT ---
const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { cart, clearCart } = useCartStore();

  const [isLoading, setIsLoading] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  // State Management
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddresses | null>(
    null
  );
  const [shippingCost, setShippingCost] = useState(0);
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddresses | null>(null);

  const fetchUserAddresses = useCallback(async () => {
    // Don't fetch if cart is empty
    if (!cart?.items.length) {
      return;
    }

    const token = getCookie("access_token") as string;
    if (!token) {
      throw new Error("No access token found");
    }
    try {
      const { data } = await axios.get(`${apiUrl}/api/addresses/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.data) {
        setAddresses(data.data);
        if (!selectedAddress) {
          const mainAddresses = data.data.filter(
            (address: IAddresses) => address.isDefault
          );
          setSelectedAddress(mainAddresses[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error; // Re-throw to be caught by the caller
    }
  }, [user?.id, selectedAddress, cart?.items.length]);

  useEffect(() => {
    const loadAddresses = async () => {
      if (!user?.id || !cart?.items.length) {
        console.log("No user ID or empty cart");
        setIsLoading(false);
        return;
      }

      try {
        await fetchUserAddresses();
      } catch (err) {
        console.error("Error loading user addresses:", err);
        // Only show alert if cart is not empty (meaningful error)
        if (cart?.items.length > 0) {
          alert("Error loading user addresses.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true); // Set loading state before fetching
    loadAddresses();
    // eslint-disable-next-line
  }, [user?.id, cart?.items.length]);

  // Effect to update shipping cost based on delivery method or address change
  useEffect(() => {
    const calculateShipping = async () => {
      try {
        if (deliveryMethod === "PICKUP") {
          setShippingCost(0);
          return;
        }

        if (!cart || !selectedAddress?.id) {
          return;
        }

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

        if (typeof data.shippingCost === "number") {
          setShippingCost(data.shippingCost);
        }
      } catch (err) {
        console.error("Error calculating shipping cost:", err);
        alert("Error calculating shipping cost.");
      }
    };

    calculateShipping();
  }, [deliveryMethod, selectedAddress?.id, cart]);

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
      const orderId = response.data.order.newOrder.id;
      // const orderId = response.data.order.order.id

      if (deliveryMethod === "DELIVERY" && paymentMethod === "ONLINE")
        window.snap?.pay(paymentToken);

      if (deliveryMethod === "PICKUP" && paymentMethod === "ONLINE")
        window.snap?.pay(paymentToken);

      if (deliveryMethod === "PICKUP" && paymentMethod === "INSTORE")
        router.push(`/success?order_id=${orderId}`);

      clearCart();
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
            Tidak ada produk untuk checkout
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen font-sans text-gray-800">
        <main className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl">
              Checkout
            </h1>
            <div className="mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Nama Penerima
                    </h3>
                    <div className="mt-4 rounded-md border border-gray-200 p-4">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Metode Pelayanan
                    </h3>
                    <div className="mt-4 grid gap-4 grid-cols-2">
                      <label
                        htmlFor="delivery"
                        className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                          deliveryMethod === "DELIVERY"
                            ? "ring-blue-500 border-blue-500"
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
                          onChange={(e) => {
                            setDeliveryMethod(e.target.value);
                            setPaymentMethod("ONLINE");
                          }}
                        />
                        <div className="flex flex-1">
                          <div className="flex flex-col">
                            <span className="block text-sm font-medium text-gray-900">
                              Delivery
                            </span>
                            <span className="mt-1 flex items-center text-sm text-gray-500">
                              15-30 menit Tergantung Jarak
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">
                              Bervariasi
                            </span>
                          </div>
                        </div>
                        <TruckIcon />
                      </label>
                      <label
                        htmlFor="pickup"
                        className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                          deliveryMethod === "PICKUP"
                            ? "ring-blue-500 border-blue-500"
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
                              Langsung ambil di toko
                            </span>
                            <span className="mt-6 text-sm font-medium text-gray-900">
                              Gratis
                            </span>
                          </div>
                        </div>
                        <StoreIcon />
                      </label>
                    </div>
                  </div>

                  {deliveryMethod === "PICKUP" && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Metode Pembayaran
                      </h3>
                      <div className="mt-4 grid gap-4 grid-cols-2">
                        <label
                          htmlFor="online"
                          className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                            paymentMethod === "ONLINE"
                              ? "ring-blue-500 border-slate-500"
                              : "ring-transparent border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value="ONLINE"
                            id="online"
                            className="sr-only"
                            checked={paymentMethod === "ONLINE"}
                            onChange={(e) => {
                              setPaymentMethod(e.target.value);
                            }}
                          />
                          <div className="flex flex-1">
                            <div className="flex flex-col">
                              <span className="block text-sm font-medium text-gray-900">
                                Online
                              </span>
                            </div>
                          </div>
                        </label>
                        <label
                          htmlFor="instore"
                          className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm ring-2 focus:outline-none ${
                            paymentMethod === "INSTORE"
                              ? "ring-blue-500 border-blue-500"
                              : "ring-transparent border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value="INSTORE"
                            id="instore"
                            className="sr-only"
                            checked={paymentMethod === "INSTORE"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <div className="flex flex-1">
                            <div className="flex flex-col">
                              <span className="block text-sm font-medium text-gray-900">
                                Instore
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {deliveryMethod === "DELIVERY" && (
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Alamat Pengiriman
                        </h3>
                        <button
                          onClick={() => setListModalOpen(true)}
                          className="text-sm font-medium text-slate-600 hover:text-slate-800"
                        >
                          Ganti
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
                          <p>Pilih ALamat Pengiriman.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section
                aria-labelledby="summary-heading"
                className="mt-8 border border-gray-300 shadow-sm rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-xl font-semibold text-blue-500"
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
                          className="h-24 w-24 rounded-md border border-gray-300 object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Berat: {item.product.weightInKg} kg
                          </p>
                        </div>
                        <div className="flex items-end justify-between text-sm">
                          <p className="text-gray-700">Jumlah {item.quantity}</p>
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
                    <dt className="text-sm text-gray-600">Pengiriman</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Rp{" "}
                      {shippingCost.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">PPN 11%</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Rp{" "}
                      {tax.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-semibold text-gray-900">
                      Total Belanja
                    </dt>
                    <dd className="text-xl font-semibold text-blue-500">
                      Rp{" "}
                      {total.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <button
                    type="submit"
                    onClick={handleConfirmOrder}
                    className="w-full rounded-md border border-transparent bg-blue-500 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Konfirmasi Pembelanjaan
                  </button>
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
      <AddressCheckoutModal
        isOpen={isFormModalOpen}
        onSave={() => fetchUserAddresses()}
        onSelect={setSelectedAddress}
        onClose={() => setFormModalOpen(false)}
        address={editingAddress}
      />
    </>
  );
};

export default CheckoutPage;
