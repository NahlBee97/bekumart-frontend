import { IAddresses } from "@/interfaces/addressInterface";
import CheckoutPageClient from "@/components/checkout/checkoutPageClient";
import { getUserAddresses, getUserId } from "@/lib/data";

// This is the Server Component
export default async function CheckoutPage() {
  const userId = await getUserId();

  const initialAddresses: IAddresses[] = await getUserAddresses(userId);

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
