"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { midtransClientKey } from "@/config";
import { AddressListModal } from "@/components/checkout/addressListModal";
import { useRouter } from "next/navigation";
import { AddressCheckoutModal } from "@/components/checkout/addressCheckoutModal";
import toast from "react-hot-toast";
import { getUserAddresses } from "@/lib/data";
import api from "@/lib/axios";
import Loading from "../loading";
import { EmptyCartState } from "./emptyCartState";
import { DeliveryMethodSection } from "./deliveryMethodSection";
import { PaymentMethodSection } from "./paymentMethodSection";
import { AddressSection } from "./addressSection";
import { OrderSummary } from "./orderSummarySection";
import {
  IAddress,
  ICourier,
  IOrderData,
  IShippingCostData,
} from "@/interfaces/dataInterfaces";
import { FulfillmentTypes, PaymentMethod } from "@/interfaces/enums";

// --- MAIN PAGE COMPONENT ---
export default function CheckoutPageClient() {
  const router = useRouter();
  const { user, isAuthLoading, accessToken } = useAuthStore();
  const { cart, isCartLoading, clearCart } = useCartStore();

  // State Management
  const [deliveryMethod, setDeliveryMethod] = useState<FulfillmentTypes>(
    FulfillmentTypes["DELIVERY"]
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod["ONLINE"]
  );
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [couriers, setCouriers] = useState<ICourier[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<ICourier | null>(null);
  const [isListModalOpen, setListModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);

  // Memoized calculations
  const subtotal = useMemo(
    () =>
      cart?.items?.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) || 0,
    [cart?.items]
  );

  const tax = useMemo(() => subtotal * 0.11, [subtotal]);
  const total = useMemo(
    () => subtotal + shippingCost + tax,
    [subtotal, shippingCost, tax]
  );

  // Fetch user addresses
  const refreshUserAddresses = useCallback(async () => {
    if (!cart?.items.length || !user?.id || isAuthLoading) return;

    try {
      const userAddresses = await getUserAddresses(user.id);
      if (!selectedAddress) {
        const mainAddress = userAddresses.find(
          (address: IAddress) => address.isDefault
        );
        setSelectedAddress(mainAddress);
      }
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Gagal memuat alamat");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, cart?.items.length, selectedAddress, isAuthLoading]);

  // Calculate shipping cost
  const getCouriers = useCallback(async () => {
    if (!cart?.items.length) return;

    if (deliveryMethod === "PICKUP") {
      setShippingCost(0);
      return;
    }

    if (!selectedAddress?.id) {
      setShippingCost(0);
      return;
    }

    try {
      const data: IShippingCostData = {
        addressId: selectedAddress.id,
        totalWeight: cart.totalWeight,
      };

      const response = await api.post("/api/shipping-cost", data);

      setCouriers(response.data.couriers);
      setSelectedCourier(response.data.couriers[0]);
      setShippingCost(response.data.couriers[0].cost);
    } catch (err) {
      console.error("Error calculating shipping cost:", err);
      toast.error("Gagal menghitung biaya pengiriman");
    } finally {
      setIsCalculating(false);
    }
  }, [deliveryMethod, selectedAddress?.id, cart]);

  // Effects
  useEffect(() => {
    refreshUserAddresses();
  }, [refreshUserAddresses]);

  useEffect(() => {
    getCouriers();
  }, [getCouriers]);

  // Midtrans script loading
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

  // Event handlers
  const handleDeliveryMethodChange = (method: FulfillmentTypes) => {
    setDeliveryMethod(method);
    if (method === "PICKUP") {
      setPaymentMethod(PaymentMethod["ONLINE"]);
    }
  };

  const openAddForm = () => {
    setEditingAddress(null);
    setListModalOpen(false);
    setFormModalOpen(true);
  };

  const openEditForm = (address: IAddress) => {
    setEditingAddress(address);
    setListModalOpen(false);
    setFormModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    // Validation
    if (deliveryMethod === "DELIVERY" && !selectedAddress) {
      toast.error("Pilih alamat pengiriman terlebih dahulu");
      return;
    }

    try {
      setIsSubmitting(true);
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const orderData: IOrderData = {
        userId: user.id,
        fullfillmentType: deliveryMethod,
        paymentMethod,
        addressId:
          deliveryMethod === "DELIVERY" ? selectedAddress?.id : undefined,
        totalAmount: total,
        courier: selectedCourier?.name as string,
      };

      const response = await api.post(`/api/orders`, orderData);
      const { paymentToken, newOrder } = response.data.order;
      const orderId = newOrder.id;

      // Handle different payment flows
      if (paymentMethod === "ONLINE") {
        window.snap?.pay(paymentToken);
      } else if (paymentMethod === "INSTORE" && deliveryMethod === "PICKUP") {
        router.push(`/success?order_id=${orderId}`);
      }

      clearCart();
      toast.success("Pesanan Berhasil Dibuat");
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error("Error checking out");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading and empty states
  if (isAuthLoading && isCartLoading) return <Loading />;

  if (cart?.items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-gray-800">
        <div className="flex items-center gap-2 p-2 md:px-8 md:py-4">
          <ArrowLeft
            className="md:hidden h-6 w-6 text-blue-500"
            onClick={() => router.push("/cart")}
          />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-500 ">
            Checkout
          </h1>
        </div>
        <main className="mx-auto max-w-7xl pb-4 pt-2">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className=" lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              {/* Left Column - Delivery & Address */}
              <section
                aria-labelledby="cart-heading"
                className="lg:col-span-7 "
              >
                <div className="space-y-8 border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
                  <DeliveryMethodSection
                    isLoading={isLoading}
                    deliveryMethod={deliveryMethod}
                    onDeliveryMethodChange={handleDeliveryMethodChange}
                  />

                  {deliveryMethod === "PICKUP" && (
                    <PaymentMethodSection
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                    />
                  )}

                  {deliveryMethod === "DELIVERY" && (
                    <AddressSection
                      isLoading={isLoading}
                      selectedAddress={selectedAddress as IAddress}
                      onEditAddress={() => setListModalOpen(true)}
                      onCourierChange={(courier) => {
                        setSelectedCourier(courier);
                        setShippingCost(courier.cost);
                      }}
                      couriers={couriers}
                    />
                  )}
                </div>
              </section>

              {/* Right Column - Order Summary */}
              <OrderSummary
                isLoading={isCartLoading}
                cart={cart}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
                isCalculating={isCalculating}
                isSubmitting={isSubmitting}
                onConfirmOrder={handleConfirmOrder}
                deliveryMethod={deliveryMethod}
                selectedAddress={selectedAddress as IAddress}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
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
        onSave={refreshUserAddresses}
        onSelect={setSelectedAddress}
        onClose={() => setFormModalOpen(false)}
        address={editingAddress}
      />
    </>
  );
}
