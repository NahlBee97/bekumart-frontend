import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IAddresses } from "@/interfaces/addressInterface";
import { IUser } from "@/interfaces/authInterfaces";
import { getAddressByUserId } from "@/lib/addressData";
import CheckoutPageClient from "@/components/checkout/checkoutPageClient";

// This is the Server Component
export default async function CheckoutPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value as string;

  const decodedToken = jwtDecode<IUser>(token);
  const userId = decodedToken.id;

  const initialAddresses: IAddresses[] = await getAddressByUserId(userId);

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
