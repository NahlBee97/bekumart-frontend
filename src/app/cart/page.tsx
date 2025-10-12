import CartPageClient from "@/components/cart/cartPageClient";

// This is now a Server Component
export default async function CartPage({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const { callbackUrl } = await searchParams;

  return <CartPageClient callbackUrl={callbackUrl} />;
}
