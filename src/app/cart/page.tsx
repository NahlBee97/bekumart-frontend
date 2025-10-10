import CartPageClient from "@/components/cart/cartPageClient";
import { getCartData, getUserId } from "@/lib/data";

// This is now a Server Component
export default async function CartPage({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const userId = await getUserId();
  const cartData = await getCartData(userId);
  const { callbackUrl } = await searchParams;

  return <CartPageClient initialCart={cartData} callbackUrl={callbackUrl} />;
}
