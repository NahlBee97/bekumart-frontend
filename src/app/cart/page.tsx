import CartPageClient from "@/components/cart/cartPageClient";
import { getCartData } from "@/lib/cartData";

// This is now a Server Component
export default async function CartPage({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const cartData = await getCartData();
  const { callbackUrl } = await searchParams;

  return <CartPageClient initialCart={cartData} callbackUrl={callbackUrl} />;
}
