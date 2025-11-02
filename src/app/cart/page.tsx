import CartPageClient from "@/components/cart/cartPageClient";
import { UserRouteGuard } from "@/components/wrapper/userRouteGuard";

// This is now a Server Component
export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <UserRouteGuard>
      <CartPageClient callbackUrl={callbackUrl} />
    </UserRouteGuard>
  );
}
