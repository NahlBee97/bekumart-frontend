import { IAddresses } from "@/interfaces/addressInterface";
import { getUserAddresses } from "@/lib/addressData";
import CheckoutPageClient from "@/components/checkout/checkoutPageClient";

// This is the Server Component
export default async function CheckoutPage() {

  const initialAddresses: IAddresses[] = await getUserAddresses();

  // Find the default address to pre-select it
  const initialSelectedAddress =
    initialAddresses.find((address: IAddresses) => address.isDefault) ||
    initialAddresses[0];

  return (
    <CheckoutPageClient
      initialAddresses={initialAddresses}
      initialSelectedAddress={initialSelectedAddress}
    />
  );
}
